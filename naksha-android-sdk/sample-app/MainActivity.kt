package dev.naksha.demo

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.lifecycleScope
import dev.naksha.sdk.NakshaConfig
import dev.naksha.sdk.NakshaSDK
import dev.naksha.sdk.models.*
import kotlinx.coroutines.launch

class MainActivity : ComponentActivity() {

    private lateinit var nakshaSDK: NakshaSDK

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // 1. Initialize Naksha SDK
        nakshaSDK = NakshaSDK.initialize(
            context = applicationContext,
            config = NakshaConfig(
                enableNightSafetyFilter = true,
                enableMonsoonWaterlogWarnings = true
            )
        )

        setContent {
            MaterialTheme(
                colorScheme = darkColorScheme(
                    primary = Color(0xFFFF7722),
                    background = Color(0xFF09090B),
                    surface = Color(0xFF18181B)
                )
            ) {
                NakshaNavigationScreen(nakshaSDK)
            }
        }
    }
}

@Composable
fun NakshaNavigationScreen(sdk: NakshaSDK) {
    val coroutineScope = rememberCoroutineScope()
    var routes by remember { mutableStateOf<List<RouteOption>>(emptyList()) }
    var selectedRoute by remember { mutableStateOf<RouteOption?>(null) }
    var isLoading by remember { mutableStateOf(false) }

    LaunchedEffect(Unit) {
        isLoading = true
        // Search popular Delhi - Gurgaon route
        val result = sdk.routes.calculateRoutes(
            origin = Coordinates(28.6315, 77.2167), // Connaught Place
            destination = Coordinates(28.4950, 77.0895), // Cyber City Gurgaon
            originName = "Connaught Place, Delhi",
            destinationName = "Cyber City, Gurgaon"
        )
        routes = result
        selectedRoute = result.firstOrNull()
        isLoading = false
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF09090B))
            .padding(16.dp)
    ) {
        // Top Header
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(
                    text = "नक्शा Naksha SDK",
                    color = Color.White,
                    fontSize = 24.sp,
                    fontWeight = FontWeight.Black
                )
                Text(
                    text = "Smart Indian Road Navigation & Telemetry",
                    color = Color(0xFFA1A1AA),
                    fontSize = 12.sp
                )
            }

            Surface(
                color = Color(0x33FF7722),
                shape = RoundedCornerShape(12.dp)
            ) {
                Text(
                    text = "Android Demo",
                    color = Color(0xFFFF7722),
                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                    fontSize = 10.sp,
                    fontWeight = FontWeight.Bold
                )
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        if (isLoading) {
            Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                CircularProgressIndicator(color = Color(0xFFFF7722))
            }
        } else {
            LazyColumn(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                items(routes) { route ->
                    RouteCardItem(
                        route = route,
                        isSelected = selectedRoute?.id == route.id,
                        onSelect = { selectedRoute = route }
                    )
                }
            }
        }
    }
}

@Composable
fun RouteCardItem(
    route: RouteOption,
    isSelected: Boolean,
    onSelect: () -> Unit
) {
    Card(
        onClick = onSelect,
        shape = RoundedCornerShape(20.dp),
        colors = CardDefaults.cardColors(
            containerColor = if (isSelected) Color(0xFF27272A) else Color(0xFF18181B)
        ),
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(
                    text = route.title,
                    fontWeight = FontWeight.Bold,
                    color = Color.White,
                    fontSize = 16.sp
                )
                Text(
                    text = "${route.distanceKm} km • ${route.durationMinutes} mins",
                    color = Color(0xFFFF7722),
                    fontWeight = FontWeight.Bold,
                    fontSize = 14.sp
                )
            }

            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = route.summary,
                color = Color(0xFFA1A1AA),
                fontSize = 12.sp
            )

            Spacer(modifier = Modifier.height(12.dp))

            // Telemetry Badges
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                Surface(
                    color = Color(0x2210B981),
                    shape = RoundedCornerShape(8.dp)
                ) {
                    Text(
                        text = "RQI: ${route.roadQualityIndex}/100",
                        color = Color(0xFF10B981),
                        modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp),
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold
                    )
                }

                Surface(
                    color = Color(0x22A855F7),
                    shape = RoundedCornerShape(8.dp)
                ) {
                    Text(
                        text = "Auto: ₹${route.fareSummary.autoMeterFareInr.toInt()}",
                        color = Color(0xFFA855F7),
                        modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp),
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            }
        }
    }
}
