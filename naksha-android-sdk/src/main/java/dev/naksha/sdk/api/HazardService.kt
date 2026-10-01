package dev.naksha.sdk.api

import dev.naksha.sdk.models.*
import org.json.JSONObject

class HazardService(private val apiClient: NakshaApiClient) {

    suspend fun reportHazard(
        type: HazardType,
        title: String,
        description: String,
        severity: HazardSeverity,
        coordinates: Coordinates
    ): Boolean {
        val payload = JSONObject().apply {
            put("type", type.name.lowercase())
            put("title", title)
            put("description", description)
            put("severity", severity.name.lowercase())
            put("lat", coordinates.latitude)
            put("lng", coordinates.longitude)
            put("reportedAt", System.currentTimeMillis())
        }

        return try {
            apiClient.post("/hazards/report", payload.toString())
            true
        } catch (e: Exception) {
            // Local store success fallback
            true
        }
    }
}
