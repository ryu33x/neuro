Red Neuronal con Entrenamiento Automático
Este proyecto consiste en una implementación de una red neuronal simple con una interfaz gráfica que permite visualizar el entrenamiento y las predicciones en tiempo real. La red neuronal se entrena automáticamente con datos generados dinámicamente y muestra los resultados en un plano cartesiano.

Estructura del Proyecto
El proyecto consta de dos archivos principales:

index.html: Contiene la estructura HTML y el estilo CSS para la interfaz gráfica.

neuralNetwork.js: Contiene la implementación de la red neuronal y la lógica para el entrenamiento y la visualización.

Características Principales
Interfaz Gráfica (index.html)
Plano Cartesiano: Muestra un gráfico interactivo donde se visualizan los puntos generados y las predicciones de la red neuronal.

Entrada Automática: Genera valores aleatorios para las entradas de la red neuronal.

Salida: Muestra el resultado de la predicción y el error promedio durante el entrenamiento.

Control de Entrenamiento: Permite pausar y reanudar el entrenamiento y la predicción.

Red Neuronal (neuralNetwork.js)
Arquitectura: La red neuronal tiene 2 nodos de entrada, 8 nodos ocultos y 1 nodo de salida.

Funciones de Activación: Utiliza la función sigmoide para la activación de las neuronas.

Entrenamiento: Se entrena automáticamente con datos generados dinámicamente.

Visualización: Muestra los puntos generados en un plano cartesiano, coloreados según la predicción de la red neuronal.

Instrucciones de Uso
Abre el archivo index.html en un navegador web.

Interactúa con la interfaz:

Observa cómo la red neuronal genera datos, realiza predicciones y se entrena automáticamente.

Usa el botón "Pausar/Reanudar" para controlar el proceso de entrenamiento y predicción.

Visualiza los resultados:

Los puntos en el plano cartesiano se colorean según la predicción de la red neuronal (verde para valores cercanos a 1 y rojo para valores cercanos a 0).

El error promedio se actualiza cada 2 segundos durante el entrenamiento.

Explicación del Código
index.html
Estructura HTML: Define la estructura de la interfaz, incluyendo los campos de entrada, botones y el canvas para el plano cartesiano.

Estilos CSS: Define el estilo de la interfaz, con colores oscuros y elementos centrados.

Conexión con JavaScript: Incluye el archivo neuralNetwork.js para manejar la lógica de la red neuronal.

neuralNetwork.js
Clase NeuralNetwork:

Implementa una red neuronal con funciones para inicializar pesos, realizar predicciones y entrenar la red.

Utiliza la función sigmoide y su derivada para la propagación hacia adelante y hacia atrás.

Generación de Datos:

Los datos de entrenamiento se generan dinámicamente con valores aleatorios.

Visualización:

Los puntos generados se dibujan en un plano cartesiano, donde el color indica la predicción de la red neuronal.

Entrenamiento Automático:

La red se entrena automáticamente en intervalos de tiempo definidos.

Requisitos
Un navegador web moderno (Chrome, Firefox, Edge, etc.).

No se necesitan dependencias externas, ya que todo el código está incluido en los archivos proporcionados.

Ejecución
Clona o descarga el repositorio.

Abre el archivo index.html en tu navegador.

Interactúa con la interfaz para observar el entrenamiento y las predicciones de la red neuronal.

Capturas de Pantalla
Interfaz de la Red Neuronal
(Incluye una captura de pantalla de la interfaz en funcionamiento).

Licencia
Este proyecto está bajo la licencia MIT. Siéntete libre de modificar y distribuir el código según tus necesidades.

Contribuciones
Si deseas contribuir a este proyecto, ¡no dudes en hacer un fork y enviar un pull request! Las sugerencias y mejoras son bienvenidas.

¡Gracias por usar este proyecto! Si tienes alguna pregunta o sugerencia, no dudes en contactarme. 😊

