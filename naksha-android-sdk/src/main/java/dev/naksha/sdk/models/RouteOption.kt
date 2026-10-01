package dev.naksha.sdk.models

import kotlinx.serialization.Serializable

@Serializable
enum class RouteProfileType {
    FASTEST,
    SAFEST,
    ECO_FRIENDLY,
    SCENIC_HERITAGE,
    MULTIMODAL_TRANSIT,
    POPULAR_LOCAL
}

@Serializable
data class RouteOption(
    val id: String,
    val profileType: RouteProfileType,
    val title: String,
    val summary: String,
    val distanceKm: Double,
    val durationMinutes: Int,
    val etaString: String,
    val polylineCoordinates: List<Coordinates>,
    val turnSteps: List<TurnStep>,
    val roadQualityIndex: Int, // 0 to 100
    val lightingScore: Int,    // 0 to 100
    val potholeDensityPerKm: Double,
    val waterlogRisk: String,
    val hazards: List<RoadHazard>,
    val fareSummary: MultimodalFareSummary,
    val features: List<String>
)
