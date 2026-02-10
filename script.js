let marcas = [
    { nombre: "Ducati", puntos: 0 },
    { nombre: "Yamaha", puntos: 0 },
    { nombre: "Kawasaki", puntos: 0 },
    { nombre: "Honda", puntos: 0 },
    { nombre: "BMW Motorrad", puntos: 0 },
    { nombre: "Aprilia", puntos: 0 },
    { nombre: "KTM", puntos: 0 },
    { nombre: "Suzuki", puntos: 0 },
    { nombre: "Benelli", puntos: 0 },
    { nombre: "Husqvarna", puntos: 0 }
];

let opcionA, opcionB;
let votos = [];

function elegirMarcas() {
    let indices = [];
    while (indices.length < 2) {
        let rand = Math.floor(Math.random() * marcas.length);
        if (!indices.includes(rand)) indices.push(rand);
    }

    opcionA = marcas[indices[0]];
    opcionB = marcas[indices[1]];

    document.getElementById("optionA").innerText = opcionA.nombre;
    document.getElementById("optionB").innerText = opcionB.nombre;
}

function choose(opcion) {
    let criterio = document.getElementById("criterio").value;
    let elegida;

    if (opcion === "A") {
        opcionA.puntos++;
        opcionB.puntos = Math.max(0, opcionB.puntos - 1);
        elegida = opcionA.nombre;
    } else {
        opcionB.puntos++;
        opcionA.puntos = Math.max(0, opcionA.puntos - 1);
        elegida = opcionB.nombre;
    }

    votos.push({
        marcaA: opcionA.nombre,
        marcaB: opcionB.nombre,
        elegida,
        criterio,
        fecha: new Date().toLocaleString()
    });

    actualizarRanking();
    elegirMarcas();
}

function actualizarRanking() {
    let cuerpo = document.querySelector("#ranking tbody");
    cuerpo.innerHTML = "";

    let ordenadas = [...marcas].sort((a, b) => b.puntos - a.puntos);

    ordenadas.forEach((marca, index) => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${marca.nombre}</td>
            <td>${marca.puntos}</td>
        `;
        cuerpo.appendChild(fila);
    });
}

function nuevoDuelo() {
    elegirMarcas();
}

function reiniciar() {
    marcas.forEach(m => m.puntos = 0);
    votos = [];
    actualizarRanking();
    elegirMarcas();
}

function descargarExcel() {
    if (votos.length === 0) {
        alert("No hay votos registrados.");
        return;
    }

    let csv = "Marca A,Marca B,Marca Elegida,Criterio,Fecha\n";
    votos.forEach(v => {
        csv += `${v.marcaA},${v.marcaB},${v.elegida},${v.criterio},${v.fecha}\n`;
    });

    let blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    let url = URL.createObjectURL(blob);

    let link = document.createElement("a");
    link.href = url;
    link.download = "votos_motomash.csv";
    link.click();
}

elegirMarcas();
actualizarRanking();
