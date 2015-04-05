package templates.groovyscript

import com.jetdrone.vertx.yoke.middleware.*
import com.jetdrone.vertx.yoke.GYoke
import com.jetdrone.vertx.yoke.engine.GroovyTemplateEngine
import com.jetdrone.vertx.yoke.extras.engine.*
import com.jetdrone.vertx.yoke.engine.HandlebarsEngine
import com.jetdrone.vertx.yoke.engine.Jade4JEngine

import groovy.json.*

def logger = container.logger

// Create a new Yoke Application
GYoke app = new GYoke(vertx, container)

// define engines
app.engine(new HandlebarsEngine('views'))

// define middleware
app.use(new Favicon())
app.use(new Logger())
app.use(new BodyParser())
app.use(new MethodOverride())

// Create a new Router
GRouter router = new GRouter()
app.use(router)

// static file server
app.use(new Static('public'))

// development only
if (System.getenv('DEV') != null) {
    app.use(new ErrorHandler(true))
}

// define routes
router

    .get('/') { req ->

        req.put('title', 'My Yoke Application')
        req.put('engineName', 'Handlebars')

        req.response.render('index.hbs')
    }

    .get('/react') { req ->

        def eb = vertx.eventBus

        def uuid = java.util.UUID.randomUUID()

        def title    = 'Isomorphic ReactJS'
        def navItems = ['Home', 'Contact', 'About']
        def results  = [];

        for (int i = 0; i < 10; i++) {
            results.add([
                id: System.currentTimeMillis() + i,
                price: i * 100000L,
                summary: "This is one tasty treat....."
            ]);
        }

        def modelAsJson = JsonOutput.toJson([ uuid: uuid, title: title, navItems: navItems, results: results ])

        logger.info "[${uuid}] Incoming request"

        eb.send('compile-template', modelAsJson, { reply ->

            def slurper = new JsonSlurper()
            def result  = slurper.parseText(reply.body())

            logger.info "[${result.uuid}] message received"

            req.put('body', "${result.html}")
            req.response.render('react.hbs')
        })
    }

app.listen(8080)

container.logger.info('Yoke server listening on port 8080')