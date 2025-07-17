const malla = [
  {
    semestre: 1,
    ramos: [
      { codigo: "MAT101", nombre: "Matemática I" },
      { codigo: "ADM101", nombre: "Introducción a la Administración" },
      { codigo: "ECO101", nombre: "Microeconomía" }
    ]
  },
  {
    semestre: 2,
    ramos: [
      { codigo: "MAT102", nombre: "Matemática II", prerequisitos: ["MAT101"] },
      { codigo: "ECO102", nombre: "Macroeconomía", prerequisitos: ["ECO101"] },
      { codigo: "CON101", nombre: "Contabilidad I" }
    ]
  },
  {
    semestre: 3,
    ramos: [
      { codigo: "CON102", nombre: "Contabilidad II", prerequisitos: ["CON101"] },
      { codigo: "DER101", nombre: "Derecho Empresarial I" }
    ]
  },
  // Puedes seguir agregando más semestres aquí
];

const estadoRamos = JSON.parse(localStorage.getItem("estadoRamos")) || {};

function guardarEstado() {
  localStorage.setItem("estadoRamos", JSON.stringify(estadoRamos));
}

function cumplePrerequisitos(prerequisitos) {
  return prerequisitos.every(cod => estadoRamos[cod]);
}

function crearMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  malla.forEach(sem => {
    const columna = document.createElement("div");
    columna.classList.add("semestre");
    columna.innerHTML = `<h2>Semestre ${sem.semestre}</h2>`;

    sem.ramos.forEach(ramo => {
      const div = document.createElement("div");
      div.textContent = ramo.nombre;
      div.classList.add("ramo");

      const aprobado = estadoRamos[ramo.codigo];
      const tienePrereq = ramo.prerequisitos?.length;

      if (tienePrereq && !cumplePrerequisitos(ramo.prerequisitos)) {
        div.classList.add("bloqueado");
      } else {
        div.classList.add(aprobado ? "aprobado" : "no-aprobado");
        div.addEventListener("click", () => {
          estadoRamos[ramo.codigo] = !estadoRamos[ramo.codigo];
          guardarEstado();
          crearMalla();
        });
      }

      columna.appendChild(div);
    });

    contenedor.appendChild(columna);
  });
}

crearMalla();
