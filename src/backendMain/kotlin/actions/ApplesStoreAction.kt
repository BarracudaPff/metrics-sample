package io.ktor.samples.fullstack.backend.actions

import io.ktor.application.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*

@Suppress("unused")
enum class AppleType {
    GREEN,
    RED,
    YELLOW,
}

data class AppleOrder(
    val type: AppleType,
    val amount: Int,
)

val currentAppleOrders = mutableListOf<AppleOrder>()

suspend fun ApplicationCall.buyApple() {
    val order = receive<AppleOrder>()
    currentAppleOrders.add(order)

    respond(HttpStatusCode.OK)
}

suspend fun ApplicationCall.listAllApples() {
    respond(mapOf("orders" to currentAppleOrders))
}
