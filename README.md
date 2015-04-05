# Vert.x Example Maven Project

Test app using Vert.x and react js to create an Isomorphish web-app.

## How to run

Running the app is currently very clunky:

In root of app:
```
    mvn clean package vertx:runMod
```

next:
```
    cd target
```

next:
```
    vertx runmod com.inkfish~isomorphic-reactjs~0.0.1 -cluster 
```

In a separate window:
```
    cd src/main/resources
    vertx run morpher.js -cluster
```