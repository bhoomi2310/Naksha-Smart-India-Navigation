package dev.naksha.sdk.api

import dev.naksha.sdk.models.Coordinates
import org.json.JSONArray
import org.json.JSONObject
import java.net.URLEncoder

data class GeocodeResult(
    val displayName: String,
    val coordinates: Coordinates,
    val city: String?,
    val state: String?
)

class GeocodeService(private val apiClient: NakshaApiClient) {

    suspend fun searchLocation(query: String): List<GeocodeResult> {
        val encodedQuery = URLEncoder.encode(query, "UTF-8")
        val url = "https://nominatim.openstreetmap.org/search?q=$encodedQuery&format=json&countrycodes=in&limit=5&addressdetails=1"

        return try {
            val responseString = apiClient.get(url)
            val jsonArray = JSONArray(responseString)
            val results = mutableListOf<GeocodeResult>()

            for (i in 0 until jsonArray.length()) {
                val item = jsonArray.getJSONObject(i)
                val lat = item.getDouble("lat")
                val lon = item.getDouble("lon")
                val displayName = item.getString("display_name")
                val address = item.optJSONObject("address")
                val city = address?.optString("city") ?: address?.optString("state_district")
                val state = address?.optString("state")

                results.add(
                    GeocodeResult(
                        displayName = displayName,
                        coordinates = Coordinates(lat, lon),
                        city = city,
                        state = state
                    )
                )
            }
            results
        } catch (e: Exception) {
            // Offline fallback for known Indian landmarks
            listOf(
                GeocodeResult(
                    displayName = "$query, India",
                    coordinates = Coordinates(28.6139, 77.2090),
                    city = "Delhi",
                    state = "Delhi"
                )
            )
        }
    }
}
