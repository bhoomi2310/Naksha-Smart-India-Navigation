package dev.naksha.sdk.models

import kotlinx.serialization.Serializable

@Serializable
enum class HazardSeverity {
    LOW,
    MEDIUM,
    HIGH,
    CRITICAL
}

@Serializable
enum class HazardType {
    POTHOLE,
    WATERLOGGING,
    DARK_STRETCH,
    CONSTRUCTION,
    POLICE_CHECK,
    ACCIDENT_ZONE
}

@Serializable
data class RoadHazard(
    val id: String,
    val type: HazardType,
    val title: String,
    val description: String,
    val severity: HazardSeverity,
    val coordinates: Coordinates,
    val reportedAt: String,
    val verificationCount: Int = 1
)
