package dev.naksha.sdk.navigation

import dev.naksha.sdk.models.*
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

interface NavigationEventListener {
    fun onNextTurnInstruction(step: TurnStep, distanceRemainingMeters: Double)
    fun onHazardApproaching(hazard: RoadHazard, distanceMeters: Double)
    fun onSpeedUpdate(speedKmh: Int)
    fun onRerouteTriggered(reason: String)
    fun onDestinationArrived()
}

data class NavigationState(
    val isNavigating: Boolean = false,
    val currentStepIndex: Int = 0,
    val currentStep: TurnStep? = null,
    val distanceRemainingMeters: Double = 0.0,
    val speedKmh: Int = 0,
    val isArrived: Boolean = false
)

class NavigationManager(private val route: RouteOption) {

    private val _navigationState = MutableStateFlow(NavigationState())
    val navigationState: StateFlow<NavigationState> = _navigationState.asStateFlow()

    private var listeners = mutableListOf<NavigationEventListener>()
    private var navigationJob: Job? = null

    fun addEventListener(listener: NavigationEventListener) {
        listeners.add(listener)
    }

    fun removeEventListener(listener: NavigationEventListener) {
        listeners.remove(listener)
    }

    fun startSimulation(scope: CoroutineScope) {
        navigationJob?.cancel()
        _navigationState.value = NavigationState(
            isNavigating = true,
            currentStepIndex = 0,
            currentStep = route.turnSteps.firstOrNull(),
            distanceRemainingMeters = route.distanceKm * 1000.0,
            speedKmh = 38
        )

        navigationJob = scope.launch(Dispatchers.Default) {
            val totalSteps = route.turnSteps.size
            for (i in 0 until totalSteps) {
                val step = route.turnSteps[i]
                _navigationState.value = _navigationState.value.copy(
                    currentStepIndex = i,
                    currentStep = step,
                    distanceRemainingMeters = ((totalSteps - i).toDouble() / totalSteps) * (route.distanceKm * 1000.0),
                    speedKmh = (35..48).random()
                )

                withContext(Dispatchers.Main) {
                    listeners.forEach {
                        it.onNextTurnInstruction(step, _navigationState.value.distanceRemainingMeters)
                        it.onSpeedUpdate(_navigationState.value.speedKmh)
                    }
                }

                delay(1200) // 1.2s per step in simulation
            }

            _navigationState.value = _navigationState.value.copy(
                isNavigating = false,
                isArrived = true,
                speedKmh = 0,
                distanceRemainingMeters = 0.0
            )

            withContext(Dispatchers.Main) {
                listeners.forEach { it.onDestinationArrived() }
            }
        }
    }

    fun stopNavigation() {
        navigationJob?.cancel()
        _navigationState.value = NavigationState(isNavigating = false)
    }
}
