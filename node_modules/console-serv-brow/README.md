# console-serv-brow

El desarrollo de una aplicación en el servidor en nodejs es genial, pero el poder leer los console a la terminal suele ser complicado , por eso este pequeño paquete soluciona el poder ver los console enviados a la terminal en el browser, tambien envia los errores y las peticiones al servidor mediante un Api Rest.


### Requerimientos

Requiere 

* Express
* Socket.io
* Ejs
* morgan (opcional)

### Instalacion

Es verdaderamente sencillo 

```
npm install console-serv-brow --save

```

```
var app = express();

require('console-serv-brow')(app,{
    pathRoute:'/logs' ,
    log:console
});

```
#### Parametros 

* **app** : Este es el servidor express
- **opciones** :
	* **pathRoute** : Ruta donde se renderiza el visualizador de los consoles por defecto se renderizara en la ruta '/_console'.
	* **log** : si se necesita extender el console se le puede enviar como parametro.

	
### Modo de Uso

Para poder imprimir los logs de la terminal al browser se envia mediante


```
console.info(parametros);
```