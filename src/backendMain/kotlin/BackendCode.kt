package io.ktor.samples.fullstack.backend

import io.ktor.application.*
import io.ktor.features.*
import io.ktor.gson.*
import io.ktor.html.*
import io.ktor.http.*
import io.ktor.routing.*
import io.ktor.samples.fullstack.backend.actions.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import kotlinx.html.body

fun Application.main() {
    install(DefaultHeaders)
    install(CORS) {
        method(HttpMethod.Get)
        method(HttpMethod.Post)
        header(HttpHeaders.AccessControlAllowHeaders)
        header(HttpHeaders.ContentType)
        header(HttpHeaders.AccessControlAllowOrigin)
        allowCredentials = true
        anyHost()
    }
    install(ContentNegotiation) {
        gson()
    }

    routing {
        post("/apples/buy") {
            call.buyApple()
        }
        get("/apples") {
            call.listAllApples()
        }
        get("/") {
            call.respondHtml {
                body {
                    +"Main page"
                }
            }
        }
    }
}

fun main() {
    embeddedServer(Netty, host = "localhost", port = 8080) { main() }.start(wait = true)
}