package dev.naksha.sdk.models

import kotlinx.serialization.Serializable

@Serializable
data class Coordinates(
    val latitude: Double,
    val longitude: Double
) {
    fun toLatLngPair(): Pair<Double, Double> = Pair(latitude, longitude)

    override fun toString(): String = "$latitude,$longitude"
}
