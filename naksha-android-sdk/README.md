# 🛺 Naksha Android SDK (Smart India Navigation)

> A native Android library (Kotlin) for smart Indian road navigation, Road Quality Index (RQI), pothole and waterlogging avoidance, multimodal transit fare calculation, and turn-by-turn simulation.

---

## 📦 Installation

### Step 1: Add the repository to your `settings.gradle.kts`
```kotlin
dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()
        maven { url = uri("https://jitpack.io") }
    }
}
```

### Step 2: Add the dependency to your app `build.gradle.kts`
```kotlin
dependencies {
    implementation("dev.naksha:naksha-android-sdk:1.0.0")
    // or if included as a local module:
    // implementation(project(":naksha-android-sdk"))
}
```

---

## 🚀 Quick Start

### 1. Initialize the SDK in your `Application` class or `MainActivity`

```kotlin
import dev.naksha.sdk.NakshaSDK
import dev.naksha.sdk.NakshaConfig

class MyApp : Application() {
    override fun onCreate() {
        super.onCreate()
        
        NakshaSDK.initialize(
            context = applicationContext,
            config = NakshaConfig(
                apiKey = "YOUR_NAKSHA_API_KEY_OPTIONAL",
                enableNightSafetyFilter = true,
                enableMonsoonWaterlogWarnings = true
            )
        )
    }
}
```

---

### 2. Search Indian Locations & Geocode

```kotlin
val sdk = NakshaSDK.getInstance()

lifecycleScope.launch {
    val searchResults = sdk.geocoding.searchLocation("Connaught Place, Delhi")
    searchResults.forEach { item ->
        println("Found: ${item.displayName} @ ${item.coordinates.latitude}, ${item.coordinates.longitude}")
    }
}
```

---

### 3. Calculate 6 Multi-Criteria Indian Routes

```kotlin
lifecycleScope.launch {
    val routes = sdk.routes.calculateRoutes(
        origin = Coordinates(28.6315, 77.2167), // Connaught Place
        destination = Coordinates(28.4950, 77.0895), // Cyber City, Gurgaon
        originName = "Connaught Place, Delhi",
        destinationName = "Cyber City, Gurgaon"
    )

    routes.forEach { route ->
        println("Profile: ${route.profileType} (${route.title})")
        println("Distance: ${route.distanceKm} km, Duration: ${route.durationMinutes} mins")
        println("Road Quality Index (RQI): ${route.roadQualityIndex}/100")
        println("Streetlight Score: ${route.lightingScore}%")
        println("Auto Meter Fare: ₹${route.fareSummary.autoMeterFareInr}")
        println("Multimodal Transit Pass: ₹${route.fareSummary.totalTransitFareInr}")
    }
}
```

---

### 4. Start Turn-by-Turn Navigation & Listen for Events

```kotlin
val activeRoute = routes.first()
val navManager = sdk.createNavigationManager(activeRoute)

navManager.addEventListener(object : NavigationEventListener {
    override fun onNextTurnInstruction(step: TurnStep, distanceRemainingMeters: Double) {
        println("Next turn: ${step.instruction} (${step.distanceMeters}m away)")
    }

    override fun onHazardApproaching(hazard: RoadHazard, distanceMeters: Double) {
        println("⚠️ Alert: ${hazard.title} reported ahead!")
    }

    override fun onSpeedUpdate(speedKmh: Int) {
        println("Current speed: $speedKmh km/h")
    }

    override fun onRerouteTriggered(reason: String) {
        println("Rerouting: $reason")
    }

    override fun onDestinationArrived() {
        println("🎉 You have arrived at your destination!")
    }
})

// Start driving simulation
navManager.startSimulation(lifecycleScope)
```

---

### 5. Crowdsource a Road Hazard

```kotlin
lifecycleScope.launch {
    sdk.hazards.reportHazard(
        type = HazardType.POTHOLE,
        title = "Deep Crater on Left Lane",
        description = "Slow down below 20 km/h near flyover descent",
        severity = HazardSeverity.HIGH,
        coordinates = Coordinates(28.5245, 77.2066)
    )
}
```

---

## 🌟 Supported Indian Route Profiles

| Profile Type | Description | Key Telemetry |
|---|---|---|
| `FASTEST` | Direct flyovers and expressways | Minimum travel duration |
| `SAFEST` | Well-lit streets, verified night corridors | 98% Streetlight score |
| `ECO_FRIENDLY` | Smooth cruising, signal-optimized | Fuel savings & CO₂ cuts |
| `SCENIC_HERITAGE` | Botanical parks & iconic monuments | Tree-lined corridors |
| `MULTIMODAL_TRANSIT` | Rapid Metro line + AC feeder bus | Saves ₹180+ vs cab |
| `POPULAR_LOCAL` | Auto-rickshaw shortcut knowledge | Bypass toll gates |

---

## 📄 License
MIT License • Built for Indian Roads & Commuters.
