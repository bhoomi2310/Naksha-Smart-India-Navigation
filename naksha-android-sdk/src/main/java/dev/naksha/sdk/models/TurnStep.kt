package dev.naksha.sdk.models

import kotlinx.serialization.Serializable

@Serializable
data class TurnStep(
    val instruction: String,
    val distanceMeters: Double,
    val durationSeconds: Double,
    val streetName: String,
    val maneuverType: String,
    val modifier: String? = null,
    val location: Coordinates
)
