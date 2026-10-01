package dev.naksha.sdk.api

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONObject
import java.io.IOException
import java.util.concurrent.TimeUnit

class NakshaApiClient(
    private val baseUrl: String = "https://naksha-smart-india-navigation.vercel.app/api",
    private val apiKey: String? = null
) {
    private val client = OkHttpClient.Builder()
        .connectTimeout(15, TimeUnit.SECONDS)
        .readTimeout(20, TimeUnit.SECONDS)
        .build()

    private val jsonMediaType = "application/json; charset=utf-8".toMediaType()

    suspend fun get(url: String): String = withContext(Dispatchers.IO) {
        val requestBuilder = Request.Builder().url(url)
        apiKey?.let { requestBuilder.addHeader("Authorization", "Bearer $it") }

        val response = client.newCall(requestBuilder.build()).execute()
        if (!response.isSuccessful) {
            throw IOException("Naksha API GET failed with HTTP code: ${response.code}")
        }
        response.body?.string() ?: ""
    }

    suspend fun post(endpoint: String, jsonBody: String): String = withContext(Dispatchers.IO) {
        val fullUrl = if (endpoint.startsWith("http")) endpoint else "$baseUrl$endpoint"
        val body = jsonBody.toRequestBody(jsonMediaType)
        val requestBuilder = Request.Builder().url(fullUrl).post(body)
        apiKey?.let { requestBuilder.addHeader("Authorization", "Bearer $it") }

        val response = client.newCall(requestBuilder.build()).execute()
        if (!response.isSuccessful) {
            throw IOException("Naksha API POST failed with HTTP code: ${response.code}")
        }
        response.body?.string() ?: ""
    }
}
