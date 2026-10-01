package dev.naksha.sdk

import android.content.Context
import dev.naksha.sdk.api.*
import dev.naksha.sdk.models.*
import dev.naksha.sdk.navigation.NavigationManager

data class NakshaConfig(
    val apiKey: String? = null,
    val environment: Environment = Environment.PRODUCTION,
    val enableNightSafetyFilter: Boolean = true,
    val enableMonsoonWaterlogWarnings: Boolean = true
) {
    enum class Environment {
        PRODUCTION,
        STAGING,
        CUSTOM
    }
}

class NakshaSDK private constructor(
    val config: NakshaConfig,
    val apiClient: NakshaApiClient
) {
    val routes: RouteService = RouteService(apiClient)
    val geocoding: GeocodeService = GeocodeService(apiClient)
    val hazards: HazardService = HazardService(apiClient)

    fun createNavigationManager(route: RouteOption): NavigationManager {
        return NavigationManager(route)
    }

    companion object {
        @Volatile
        private var INSTANCE: NakshaSDK? = null

        fun initialize(
            context: Context,
            config: NakshaConfig = NakshaConfig()
        ): NakshaSDK {
            return INSTANCE ?: synchronized(this) {
                val baseUrl = when (config.environment) {
                    NakshaConfig.Environment.PRODUCTION -> "https://naksha-smart-india-navigation.vercel.app/api"
                    NakshaConfig.Environment.STAGING -> "https://staging-api.naksha.app/api"
                    NakshaConfig.Environment.CUSTOM -> "http://10.0.2.2:3001/api"
                }

                val apiClient = NakshaApiClient(baseUrl = baseUrl, apiKey = config.apiKey)
                val sdk = NakshaSDK(config = config, apiClient = apiClient)
                INSTANCE = sdk
                sdk
            }
        }

        fun getInstance(): NakshaSDK {
            return INSTANCE ?: throw IllegalStateException(
                "NakshaSDK is not initialized. Call NakshaSDK.initialize(context, config) in your Application class."
            )
        }
    }
}
