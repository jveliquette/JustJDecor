# CarCar
CarCar is a web application focused towards automotive dealerships to manage service appointments, sales, and inventory of vehicles.

## Team: Julia / Andrew

* Person 1 - Julia - Services Microservice & Services React Frontend
* Person 2 - Andrew - Sales Microservice & Sales React Frontend
* Julia and Andrew - Inventory Microservice & Inventory React Frontend

## Diagram
https://excalidraw.com/#room=0af674f1973860c91681,AXRm34SYSw8mkEGdbEmQ0Q

## Design
#### 1. Inventory API
- **Description:** Manages automobile information, vehicle models, and manufacturers.
- **Base URL:** `http://localhost:8100`
- **URLS:** "/api/automobiles/", "/api/models/", and "/api/manufacturers/"
- **Port:** `8100`

#### 2. Services API
- **Description:** Manages the service resources.
- **Base URL:** `http://localhost:8080`
- **URLs:** "/api/appointments/" and "/api/technicians/"
- **Port:** `8080`

#### 3. Sales API (!!ANDREW!!)
- **Description:**
- **Base URL:**
- **URLs:**
- **Port:**

#### 4. React Frontend
- **Description:** The frontend application for interacting with the inventory, services, and sales.
- **Base URL:** `http://localhost:5173`
- **URLs:** "/manufacturers/", "/models/", "/technicians/", "/appointments/" (!!ANDREW ADD YOUR URL EXTENSTIONS HERE!!)
- **Port:** `5173`

## Getting Started
### Prerequisites
- Python
- Docker
- Node.js
- Django
- React

### Setup
1. **Clone the Repository**
    ```bash
    git clone https://gitlab.com/jveliquette/project-beta
    cd project-beta
2. **Start the Microservices**
    ```bash
    docker-compose build
    docker-compose up
3. **Accessing the Application**
    The app can be accessed at http://localhost:5173/ in the browser.

## Value Object:
- AutomobileVO: A value object representing an automobile. It is being used inside both the Service and Sales Microservices. Includes "sold" and "vin".

## Service microservice
- **Models:**
    -**Technician:** Represents service technicians. Includes "first_name", "last_name", and "employee_id". This model links technicians to specific service appointments.
    -**Appointment:** Tracks service appointments. Includes "date_time", "reason", "status", "vin", "customer", and "technician". This model relies on the AutomobileVO to check if a vehicle has been sold. If the vehicle has been sold, the vehicle is considered VIP status.
    -**AutomobileVO:** Value object that mirrors data from the Inventory Microservice. Includes "sold" and "vin". This model is updated every 60 seconds by polling.

### CRUD Routes (Service API):
#### Technicians:
**Create Technician**
- **Method:** `POST`
- **URL:** `http://localhost:8080/api/technicians/`
- **Description:** Creates a new technician.
    <details>
    <summary>Request Body and Response</summary>
    Request Body:
    ```json
    {
    "first_name": "Jim",
    "last_name": "Smith",
    "employee_id": 15623
    }
    ```
    Response:
    ```json
    {
    "id": 6,
    "first_name": "Jim",
    "last_name": "Smith",
    "employee_id": 15623
    }
    ```
    </details>
**Read All Technicians**
- **Method:** `GET`
- **URL:** `http://localhost:8080/api/technicians/`
- **Description:** Retrieves a list of all technicians.
    <details>
    <summary>Request Body and Response</summary>
    Request Body: N/A
    Response:
    ```json
    {
	    "technicians": [
            {
                "id": 6,
                "first_name": "Jim",
                "last_name": "Smith",
                "employee_id": "15623"
            }
        ]
    }
    ```
    </details>
**Delete a Technician**
- **Method:** `DELETE`
- **URL:** `http://localhost:8080/api/technicians/:id/`
- **Description:** Deletes a specific technician by ID.
    <details>
    <summary>Request Body and Response</summary>
    Request Body: N/A
    Response:
    ```json
    {
	"Deleted": true
    }
    ```
    </details>

#### Appointments:
**Create Appointment**
- **Method:** `POST`
- **URL:** `http://localhost:8080/api/appointments/`
- **Description:** Creates a new appointment.
    <details>
    <summary>Request Body and Response</summary>
    Request Body:
    ```json
    {
		"date_time": "2024-08-13T18:40:16+00:00",
		"reason": "Tire rotation",
		"status": "scheduled",
		"vin": "FYGWYFEY425",
		"customer": "Bobby Brown",
		"technician": 2
    }
    ```
    Response:
    ```json
    {
        "date_time": "2024-08-13T18:40:16+00:00",
        "reason": "Tire rotation",
        "status": "scheduled",
        "vin": "FYGWYFEY425",
        "customer": "Bobby Brown",
        "technician": {
            "id": 2,
            "first_name": "Jim",
            "last_name": "Smith",
            "employee_id": "123"
        }
    }
    ```
    </details>
**Read All Appointments**
- **Method:** `GET`
- **URL:** `http://localhost:8080/api/appointments/`
- **Description:** Retrieves a list of all appointments.
    <details>
    <summary>Request Body and Response</summary>
    Request Body: N/A
    Response:
    ```json
    {
	    "appointments": [
            {
                "id": 1,
                "date_time": "2024-08-13T18:40:16+00:00",
                "reason": "Oil change",
                "status": "finished",
                "vin": "FYGWYFEY425",
                "customer": "Bobby Brown",
                "technician": {
                    "id": 2,
                    "first_name": "Jim",
                    "last_name": "Smith",
                    "employee_id": "123"
                }
            }
        ]
    }
    ```
    </details>
**Update an Appointment Status to Canceled**
- **Method:** `PUT`
- **URL:** `http://localhost:8080/api/appointments/:id/cancel/`
- **Description:** Updates appointment status to canceled by ID.
    <details>
    <summary>Request Body and Response</summary>
    Request Body: N/A
    Response:
    ```json
    {
        "id": 1,
        "date_time": "2024-08-13T18:40:16+00:00",
        "reason": "Oil change",
        "status": "canceled",
        "vin": "FYGWYFEY425",
        "customer": "Bobby Brown",
        "technician": {
            "id": 2,
            "first_name": "Jim",
            "last_name": "Smith",
            "employee_id": "123"
        }
    }
    ```
    </details>
**Update an Appointment Status to Finished**
- **Method:** `PUT`
- **URL:** `http://localhost:8080/api/appointments/:id/finish/`
- **Description:** Updates appointment status to finished by ID.
    <details>
    <summary>Request Body and Response</summary>
    Request Body: N/A
    Response:
    ```json
    {
        "id": 1,
        "date_time": "2024-08-13T18:40:16+00:00",
        "reason": "Oil change",
        "status": "finished",
        "vin": "FYGWYFEY425",
        "customer": "Bobby Brown",
        "technician": {
            "id": 2,
            "first_name": "Jim",
            "last_name": "Smith",
            "employee_id": "123"
        }
    }
    ```
**Delete an Appointment**
- **Method:** `DELETE`
- **URL:** `http://localhost:8080/api/appointments/:id/`
- **Description:** Deletes a specific appointment by ID.
    <details>
    <summary>Request Body and Response</summary>
    Request Body: N/A
    Response:
    ```json
    {
	"Deleted": true
    }
    ```
    </details>

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
