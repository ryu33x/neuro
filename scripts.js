class NeuralNetwork {
    constructor(inputNodes, hiddenNodes, outputNodes, learningRate = 0.1) {
        this.inputNodes = inputNodes;
        this.hiddenNodes = hiddenNodes;
        this.outputNodes = outputNodes;
        this.learningRate = learningRate;

        this.weightsIH = this.createMatrix(hiddenNodes, inputNodes);
        this.weightsHO = this.createMatrix(outputNodes, hiddenNodes);
        this.biasH = this.createMatrix(hiddenNodes, 1);
        this.biasO = this.createMatrix(outputNodes, 1);
    }

    createMatrix(rows, cols) {
        let matrix = [];
        for(let i = 0; i < rows; i++) {
            matrix[i] = [];
            for(let j = 0; j < cols; j++) {
                matrix[i][j] = Math.random() * 2 - 1;
            }
        }
        return matrix;
    }

    sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }

    sigmoidDerivative(x) {
        return x * (1 - x);
    }

    predict(inputs) {
        let inputMatrix = inputs.map(x => [x]);
        let hidden = this.matrixMultiply(this.weightsIH, inputMatrix);
        hidden = this.matrixAdd(hidden, this.biasH);
        hidden = hidden.map(row => row.map(this.sigmoid));
        let outputs = this.matrixMultiply(this.weightsHO, hidden);
        outputs = this.matrixAdd(outputs, this.biasO);
        outputs = outputs.map(row => row.map(this.sigmoid));
        return outputs[0][0];
    }

    train(inputs, targets) {
        let output = this.predict(inputs);
        let outputMatrix = [[output]];
        let targetMatrix = targets.map(x => [x]);

        let outputErrors = this.matrixSubtract(targetMatrix, outputMatrix);
        let error = outputErrors[0][0] ** 2;

        let outputGradients = outputMatrix.map(row => row.map(this.sigmoidDerivative));
        let outputDeltas = this.matrixMultiplyElementWise(outputErrors, outputGradients);

        let hidden = this.matrixMultiply(this.weightsIH, inputs.map(x => [x])).map(row => row.map(this.sigmoid));
        let weightsHODeltas = this.matrixMultiply(outputDeltas, this.transpose(hidden));
        this.weightsHO = this.matrixAdd(this.weightsHO, this.matrixScale(weightsHODeltas, this.learningRate));
        this.biasO = this.matrixAdd(this.biasO, this.matrixScale(outputDeltas, this.learningRate));

        let weightsHOT = this.transpose(this.weightsHO);
        let hiddenErrors = this.matrixMultiply(weightsHOT, outputErrors);
        let hiddenGradients = hidden.map(row => row.map(this.sigmoidDerivative));
        let hiddenDeltas = this.matrixMultiplyElementWise(hiddenErrors, hiddenGradients);

        let inputsT = this.transpose(inputs.map(x => [x]));
        let weightsIHDeltas = this.matrixMultiply(hiddenDeltas, inputsT);
        this.weightsIH = this.matrixAdd(this.weightsIH, this.matrixScale(weightsIHDeltas, this.learningRate));
        this.biasH = this.matrixAdd(this.biasH, this.matrixScale(hiddenDeltas, this.learningRate));

        return error;
    }

    matrixMultiply(a, b) {
        let result = [];
        for(let i = 0; i < a.length; i++) {
            result[i] = [];
            for(let j = 0; j < b[0].length; j++) {
                let sum = 0;
                for(let k = 0; k < a[0].length; k++) {
                    sum += a[i][k] * b[k][j];
                }
                result[i][j] = sum;
            }
        }
        return result;
    }

    matrixAdd(a, b) {
        let result = [];
        for(let i = 0; i < a.length; i++) {
            result[i] = [];
            for(let j = 0; j < a[0].length; j++) {
                result[i][j] = a[i][j] + b[i][j];
            }
        }
        return result;
    }

    matrixSubtract(a, b) {
        let result = [];
        for(let i = 0; i < a.length; i++) {
            result[i] = [];
            for(let j = 0; j < a[0].length; j++) {
                result[i][j] = a[i][j] - b[i][j];
            }
        }
        return result;
    }

    matrixMultiplyElementWise(a, b) {
        let result = [];
        for(let i = 0; i < a.length; i++) {
            result[i] = [];
            for(let j = 0; j < a[0].length; j++) {
                result[i][j] = a[i][j] * b[i][j];
            }
        }
        return result;
    }

    matrixScale(matrix, scalar) {
        let result = [];
        for(let i = 0; i < matrix.length; i++) {
            result[i] = [];
            for(let j = 0; j < matrix[0].length; j++) {
                result[i][j] = matrix[i][j] * scalar;
            }
        }
        return result;
    }

    transpose(matrix) {
        let result = [];
        for(let j = 0; j < matrix[0].length; j++) {
            result[j] = [];
            for(let i = 0; i < matrix.length; i++) {
                result[j][i] = matrix[i][j];
            }
        }
        return result;
    }
}

// Generar datos dinámicos
function generateDynamicData() {
    const x1 = Math.random();
    const x2 = Math.random();
    const target = (x1 * x1 + x2 * x2 < 0.5) ? 1 : 0;
    return { inputs: [x1, x2], targets: [target] };
}

// Red neuronal
const nn = new NeuralNetwork(2, 8, 1, 0.1);

// Configuración del canvas
const canvas = document.getElementById('dataCanvas');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Lista para almacenar puntos recientes
let recentPoints = [];

// Dibujar el plano cartesiano y los puntos
function drawCartesianPlane() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Dibujar ejes
    ctx.strokeStyle = '#555555';
    ctx.beginPath();
    ctx.moveTo(canvasWidth / 2, 0);
    ctx.lineTo(canvasWidth / 2, canvasHeight);
    ctx.moveTo(0, canvasHeight / 2);
    ctx.lineTo(canvasWidth, canvasHeight / 2);
    ctx.stroke();

    // Dibujar círculo de referencia (x1^2 + x2^2 = 0.5)
    ctx.beginPath();
    ctx.arc(canvasWidth / 2, canvasHeight / 2, Math.sqrt(0.5) * canvasWidth / 2, 0, 2 * Math.PI);
    ctx.strokeStyle = '#00ccff';
    ctx.stroke();

    // Dibujar puntos recientes
    recentPoints.forEach(point => {
        const x = point.inputs[0] * canvasWidth;
        const y = (1 - point.inputs[1]) * canvasHeight;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fillStyle = point.predicted > 0.5 ? '#00ff00' : '#ff0000';
        ctx.fill();
    });
}

// Entrenamiento automático
let trainInterval = null;
function startAutoTrain() {
    trainInterval = setInterval(() => {
        let totalError = 0;
        for(let i = 0; i < 1000; i++) {
            const data = generateDynamicData();
            totalError += nn.train(data.inputs, data.targets);
        }
        const avgError = totalError / 1000;
        document.getElementById('error').textContent = `Error promedio: ${avgError.toFixed(6)}`;
    }, 2000); // Cada 2 segundos
}

// Predicción automática con visualización y datos alrededor
let predictInterval = null;
function startAutoPredict() {
    predictInterval = setInterval(() => {
        const x1 = Math.random();
        const x2 = Math.random();
        document.getElementById('input1').value = x1.toFixed(2);
        document.getElementById('input2').value = x2.toFixed(2);
        const result = nn.predict([x1, x2]);
        document.getElementById('output').textContent = `Resultado: ${result.toFixed(4)}`;
        console.log(`Auto: Inputs: [${x1.toFixed(2)}, ${x2.toFixed(2)}] => Predicted: ${result.toFixed(4)}`);

        // Actualizar datos alrededor del canvas
        document.getElementById('topData').textContent = `Arriba (x2=1): x1=${x1.toFixed(2)}, Pred=${result.toFixed(2)}`;
        document.getElementById('bottomData').textContent = `Abajo (x2=0): x1=${x1.toFixed(2)}, Pred=${result.toFixed(2)}`;
        document.getElementById('leftData').textContent = `Izq (x1=0): x2=${x2.toFixed(2)}, Pred=${result.toFixed(2)}`;
        document.getElementById('rightData').textContent = `Der (x1=1): x2=${x2.toFixed(2)}, Pred=${result.toFixed(2)}`;

        // Añadir punto a la lista y actualizar visualización
        recentPoints.push({ inputs: [x1, x2], predicted: result });
        if(recentPoints.length > 50) recentPoints.shift();
        drawCartesianPlane();
    }, 250); // Cada 250ms
}

// Pausar/reanudar ambos procesos
let isRunning = true;
function toggleAuto() {
    if(isRunning) {
        clearInterval(predictInterval);
        clearInterval(trainInterval);
        isRunning = false;
        document.querySelector('button[onclick="toggleAuto()"]').textContent = "Reanudar";
        document.getElementById('trainingStatus').textContent = "Entrenamiento: Pausado";
    } else {
        startAutoPredict();
        startAutoTrain();
        isRunning = true;
        document.querySelector('button[onclick="toggleAuto()"]').textContent = "Pausar";
        document.getElementById('trainingStatus').textContent = "Entrenamiento: Activo";
    }
}

// Iniciar ambos procesos
startAutoPredict();
startAutoTrain();
