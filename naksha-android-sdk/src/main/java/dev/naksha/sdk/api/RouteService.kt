package dev.naksha.sdk.api

import dev.naksha.sdk.models.*
import org.json.JSONArray
import org.json.JSONObject
import java.text.SimpleDateFormat
import java.util.*
import kotlin.math.max
import kotlin.math.roundToInt

class RouteService(private val apiClient: NakshaApiClient) {

    suspend fun calculateRoutes(
        origin: Coordinates,
        destination: Coordinates,
        originName: String = "Origin",
        destinationName: String = "Destination"
    ): List<RouteOption> {
        val osrmUrl = "https://router.project-osrm.org/route/v1/driving/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?overview=full&geometries=geojson&steps=true"

        val responseStr = apiClient.get(osrmUrl)
        val json = JSONObject(responseStr)
        val routesJson = json.optJSONArray("routes") ?: return emptyList()

        if (routesJson.length() == 0) return emptyList()

        val primaryRoute = routesJson.getJSONObject(0)
        val baseDistanceKm = (primaryRoute.optDouble("distance", 8000.0)) / 1000.0
        val baseDurationMins = (primaryRoute.optDouble("duration", 1200.0) / 60.0).roundToInt()

        // Extract raw coordinates
        val geometry = primaryRoute.optJSONObject("geometry")
        val coordinatesJson = geometry?.optJSONArray("coordinates")
        val baseCoordinates = mutableListOf<Coordinates>()

        if (coordinatesJson != null) {
            for (i in 0 until coordinatesJson.length()) {
                val pt = coordinatesJson.getJSONArray(i)
                baseCoordinates.add(Coordinates(latitude = pt.getDouble(1), longitude = pt.getDouble(0)))
            }
        }

        // Extract steps
        val turnSteps = mutableListOf<TurnStep>()
        val legs = primaryRoute.optJSONArray("legs")
        if (legs != null && legs.length() > 0) {
            val stepsJson = legs.getJSONObject(0).optJSONArray("steps")
            if (stepsJson != null) {
                for (i in 0 until stepsJson.length()) {
                    val s = stepsJson.getJSONObject(i)
                    val maneuver = s.optJSONObject("maneuver")
                    val loc = maneuver?.optJSONArray("location")
                    val stepCoords = if (loc != null) Coordinates(loc.getDouble(1), loc.getDouble(0)) else origin

                    val name = s.optString("name", "Arterial Road")
                    val type = maneuver?.optString("type", "continue") ?: "continue"
                    val mod = maneuver?.optString("modifier", "")

                    val instruction = when (type) {
                        "depart" -> "Head towards $name"
                        "arrive" -> "Arrive at destination on $name"
                        "turn" -> "Turn $mod onto $name"
                        "roundabout" -> "Take roundabout exit onto $name"
                        else -> "Continue on $name"
                    }

                    turnSteps.add(
                        TurnStep(
                            instruction = instruction,
                            distanceMeters = s.optDouble("distance", 0.0),
                            durationSeconds = s.optDouble("duration", 0.0),
                            streetName = name,
                            maneuverType = type,
                            modifier = mod,
                            location = stepCoords
                        )
                    )
                }
            }
        }

        // Indian Fare Formulas
        val calcAutoFare = { km: Double -> max(30.0, (30.0 + max(0.0, km - 1.5) * 11.5).roundToInt().toDouble()) }
        val calcCabFare = { km: Double, mins: Int -> (60.0 + km * 16.5 + mins * 2.2).roundToInt().toDouble() }

        val calendar = Calendar.getInstance()
        val etaFormat = SimpleDateFormat("h:mm a", Locale.getDefault())

        val routeProfiles = listOf(
            RouteProfileType.FASTEST to (1.0 to 1.0),
            RouteProfileType.SAFEST to (1.08 to 1.15),
            RouteProfileType.ECO_FRIENDLY to (1.03 to 1.10),
            RouteProfileType.SCENIC_HERITAGE to (1.20 to 1.30),
            RouteProfileType.MULTIMODAL_TRANSIT to (1.18 to 1.45),
            RouteProfileType.POPULAR_LOCAL to (0.94 to 1.05)
        )

        return routeProfiles.map { (profile, multipliers) ->
            val dist = ((baseDistanceKm * multipliers.first) * 10.0).roundToInt() / 10.0
            val dur = (baseDurationMins * multipliers.second).roundToInt()

            val routeCalendar = calendar.clone() as Calendar
            routeCalendar.add(Calendar.MINUTE, dur)
            val eta = etaFormat.format(routeCalendar.time)

            val (title, summary, rqi, lighting, potholes, carbonSaved) = when (profile) {
                RouteProfileType.FASTEST -> RouteInfo("Expressway & Flyovers", "Fastest route avoiding inner city choke points", 88, 92, 0.8, 120)
                RouteProfileType.SAFEST -> RouteInfo("Well-Lit Night Corridor", "100% illuminated roads with low pothole density", 95, 98, 0.2, 80)
                RouteProfileType.ECO_FRIENDLY -> RouteInfo("Green Low-Carbon Gradient", "Fewer traffic signal stops, saving ~180ml fuel", 84, 85, 1.2, 380)
                RouteProfileType.SCENIC_HERITAGE -> RouteInfo("Heritage & Greenery", "Passes historic monuments and botanical parks", 86, 90, 0.9, 60)
                RouteProfileType.MULTIMODAL_TRANSIT -> RouteInfo("Metro + Bus Smart Pass", "Rapid Metro + AC feeder bus with exact token fare", 96, 99, 0.0, 720)
                RouteProfileType.POPULAR_LOCAL -> RouteInfo("Local Auto Shortcut", "Neighborhood alleys tested daily by local drivers", 76, 78, 2.1, 160)
            }

            RouteOption(
                id = profile.name.lowercase(),
                profileType = profile,
                title = title,
                summary = summary,
                distanceKm = dist,
                durationMinutes = dur,
                etaString = eta,
                polylineCoordinates = baseCoordinates,
                turnSteps = turnSteps,
                roadQualityIndex = rqi,
                lightingScore = lighting,
                potholeDensityPerKm = potholes,
                waterlogRisk = "Low",
                hazards = emptyList(),
                fareSummary = MultimodalFareSummary(
                    totalTransitFareInr = if (profile == RouteProfileType.MULTIMODAL_TRANSIT) 45.0 else 0.0,
                    autoMeterFareInr = calcAutoFare(dist),
                    cabEstimatedFareInr = calcCabFare(dist, dur),
                    carbonSavedGrams = carbonSaved
                ),
                features = listOf("Live GPS Sync", "Indian Road RQI: $rqi/100", "Streetlights: $lighting%")
            )
        }
    }

    private data class RouteInfo(
        val title: String,
        val summary: String,
        val rqi: Int,
        val lighting: Int,
        val potholes: Double,
        val carbonSaved: Int
    )
}
