// Función principal
function main() {
    // Definir el tamaño del arreglo
    const tamanoArreglo = 10000;
    // Crear un arreglo de números aleatorios entre 0 y 99999
    const arreglo = Array.from({ length: tamanoArreglo }, () => Math.floor(Math.random() * 100000));
    // Elegir un elemento aleatorio del arreglo
    const elementoABuscar = arreglo[Math.floor(Math.random() * tamanoArreglo)];

    // Array de algoritmos con nombres y funciones correspondientes
    const algoritmos = [
        ["Búsqueda Secuencial", busquedaSecuencial],
        ["Búsqueda Binaria", busquedaBinaria],
        ["Ordenamiento de la Burbuja", ordenamientoBurbuja],
        ["Quick Sort", quickSort],
        ["Método de Inserción", metodoInsercion],
    ];

    // Array para almacenar tiempos de ejecución
    const tiempos = [];

    // Recorrer cada par [nombre, algoritmo] en algoritmos
    algoritmos.forEach(([nombre, algoritmo]) => {
        // Medir el tiempo de inicio
        const inicio = performance.now();

        // Ejecutar el algoritmo correspondiente con el arreglo y elemento a buscar o copia del arreglo
        if (nombre.startsWith("Búsqueda")) {
            algoritmo(arreglo, elementoABuscar);
        } else {
            algoritmo(arreglo.slice());
        }

        // Medir el tiempo de fin
        const fin = performance.now();
        // Calcular el tiempo transcurrido y almacenarlo en el array de tiempos
        const tiempoTranscurrido = fin - inicio;
        tiempos.push([nombre, tiempoTranscurrido]);
    });

    // Ordenar el array de tiempos por tiempo de ejecución
    tiempos.sort((a, b) => a[1] - b[1]);

    // Imprimir resultados ordenados
    tiempos.forEach(([nombre, tiempo]) => {
        console.log(`${nombre}: ${tiempo} milisegundos`);
    });
}

main();

// Funciones de búsqueda y ordenamiento

// Búsqueda secuencial en un arreglo
function busquedaSecuencial(arr, elemento) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === elemento) {
            return i;
        }
    }
    return -1;
}

// Búsqueda binaria en un arreglo ordenado
function busquedaBinaria(arr, elemento) {
    let izquierda = 0;
    let derecha = arr.length - 1;
    while (izquierda <= derecha) {
        let medio = Math.floor((izquierda + derecha) / 2);
        if (arr[medio] === elemento) {
            return medio;
        } else if (arr[medio] < elemento) {
            izquierda = medio + 1;
        } else {
            derecha = medio - 1;
        }
    }
    return -1;
}

// Algoritmo de ordenamiento de la burbuja
function ordenamientoBurbuja(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
}

// Algoritmo de ordenamiento Quick Sort
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    const pivot = arr[Math.floor(arr.length / 2)];
    const menores = arr.filter(x => x < pivot);
    const iguales = arr.filter(x => x === pivot);
    const mayores = arr.filter(x => x > pivot);
    return [...quickSort(menores), ...iguales, ...quickSort(mayores)];
}

// Algoritmo de ordenamiento por inserción
function metodoInsercion(arr) {
    for (let i = 1; i < arr.length; i++) {
        const valorActual = arr[i];
        let posicion = i;
        while (posicion > 0 && arr[posicion - 1] > valorActual) {
            arr[posicion] = arr[posicion - 1];
            posicion--;
        }
        arr[posicion] = valorActual;
    }
}
