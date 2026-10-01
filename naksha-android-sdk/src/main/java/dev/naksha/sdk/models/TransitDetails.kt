package dev.naksha.sdk.models

import kotlinx.serialization.Serializable

@Serializable
enum class TransitMode {
    WALK,
    METRO,
    BUS,
    AUTO_RICKSHAW,
    CAB
}

@Serializable
data class TransitLeg(
    val mode: TransitMode,
    val lineName: String? = null,
    val fromStop: String,
    val toStop: String,
    val durationMinutes: Int,
    val distanceKm: Double,
    val fareInr: Double
)

@Serializable
data class MultimodalFareSummary(
    val totalTransitFareInr: Double,
    val autoMeterFareInr: Double,
    val cabEstimatedFareInr: Double,
    val carbonSavedGrams: Int
)
