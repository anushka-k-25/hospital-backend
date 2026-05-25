const BASE_URL = "";

window.onload = () => {

    fetchPatients();

    document
        .getElementById("searchInput")
        .addEventListener("keyup", searchPatients);
};

// ================= FETCH PATIENTS =================

async function fetchPatients(){

    try{

        const response =
            await fetch(`${BASE_URL}/patients`);

        const patients =
            await response.json();

        const tableBody =
            document.getElementById(
                "patientTableBody"
            );

        tableBody.innerHTML = "";

        document.getElementById(
            "totalPatients"
        ).innerText = patients.length;

        patients.forEach(patient => {

            tableBody.innerHTML += `

            <tr>

                <td>${patient.patientId}</td>

                <td>${patient.patientName}</td>

                <td>${patient.patientType}</td>

                <td>${patient.roomNumber}</td>

                <td>${patient.doctorName}</td>

                <td>${patient.specialization}</td>

                <td>

                    <button
                        class="delete-btn"
                        onclick="deletePatient(${patient.patientId})">

                        Delete

                    </button>

                </td>

            </tr>
            `;
        });

    }catch(error){

        alert("Backend Connection Failed");
    }
}

// ================= ADD PATIENT =================

async function addPatient(){

    const patientId =
        document.getElementById(
            "patientId"
        ).value;

    const patientName =
        document.getElementById(
            "patientName"
        ).value;

    const patientType =
        document.getElementById(
            "patientType"
        ).value;

    const roomNumber =
        document.getElementById(
            "roomNumber"
        ).value;

    const doctorName =
        document.getElementById(
            "doctorName"
        ).value;

    const specialization =
        document.getElementById(
            "specialization"
        ).value;

    // VALIDATION

    if(
        patientId === "" ||
        patientName === "" ||
        patientType === "" ||
        roomNumber === "" ||
        doctorName === "" ||
        specialization === ""
    ){

        alert("Please fill all fields");

        return;
    }

    const patient = {

        patientId: patientId,

        patientName: patientName,

        patientType: patientType,

        roomNumber: roomNumber,

        doctorName: doctorName,

        specialization: specialization
    };

    try{

        await fetch(`${BASE_URL}/patients`,{

            method: "POST",

            headers:{
                "Content-Type":"application/json"
            },

            body: JSON.stringify(patient)
        });

        alert("Patient Added Successfully");

        clearFields();

        fetchPatients();

    }catch(error){

        alert("Failed To Add Patient");
    }
}

// ================= DELETE PATIENT =================

async function deletePatient(id){

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this patient?"
        );

    if(!confirmDelete){

        return;
    }

    try{

        await fetch(`${BASE_URL}/patients/${id}`,{

            method:"DELETE"
        });

        alert("Patient Deleted Successfully");

        fetchPatients();

    }catch(error){

        alert("Delete Failed");
    }
}

// ================= CLEAR INPUTS =================

function clearFields(){

    document.getElementById(
        "patientId"
    ).value = "";

    document.getElementById(
        "patientName"
    ).value = "";

    document.getElementById(
        "patientType"
    ).value = "";

    document.getElementById(
        "roomNumber"
    ).value = "";

    document.getElementById(
        "doctorName"
    ).value = "";

    document.getElementById(
        "specialization"
    ).value = "";
}

// ================= SEARCH PATIENT =================

function searchPatients(){

    const input =
        document.getElementById(
            "searchInput"
        ).value.toLowerCase();

    const rows =
        document.querySelectorAll(
            "#patientTableBody tr"
        );

    rows.forEach(row => {

        const text =
            row.innerText.toLowerCase();

        if(text.includes(input)){

            row.style.display = "";

        }else{

            row.style.display = "none";
        }
    });
}