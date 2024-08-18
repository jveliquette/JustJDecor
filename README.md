# CarCar
![screenshot of home page](./README-IMG/main.png)
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

#### 3. Sales API
- **Description:** Manages the sales resources.
- **Base URL:** `http://localhost:8090/`
- **URLs:** "/api/salespeople/", "/api/customers/", and "/api/sales/"
- **Port:** `8090`

#### 4. React Frontend
- **Description:** The frontend application for interacting with the inventory, services, and sales.
- **Base URL:** `http://localhost:5173`
- **URLs:** "/manufacturers/", "/models/", "/technicians/", "/appointments/", "/salespeople/", "/customers/", and "/sales/"
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
3. **Accessing the Application:**
    The app can be accessed at http://localhost:5173/ in the browser.

## Value Object
- AutomobileVO: A value object representing an automobile. It is being used inside both the Service and Sales Microservices. Includes "sold" and "vin".

## Service microservice
### Models:
- **Technician:** Represents service technicians. Includes "first_name", "last_name", and "employee_id". This model links technicians to specific service appointments.
- **Appointment:** Tracks service appointments. Includes "date_time", "reason", "status", "vin", "customer", and "technician". This model relies on the AutomobileVO to check if a vehicle has been sold. If the vehicle has been sold, the vehicle is considered VIP status.
- **AutomobileVO:** Value object that mirrors data from the Inventory Microservice. Includes "sold" and "vin". This model is updated every 60 seconds by polling.

### CRUD Routes (Service API):
#### Technicians:
**Create Technician**
- **Method:** `POST`
- **URL:** `http://localhost:8080/api/technicians/`
- **Description:** Creates a new technician.
- **Request Body:**
    ```json
    {
    "first_name": "Jim",
    "last_name": "Smith",
    "employee_id": 15623
    }
    ```
- **Response:**
    ```json
    {
    "id": 6,
    "first_name": "Jim",
    "last_name": "Smith",
    "employee_id": 15623
    }
    ```
**Read All Technicians**
- **Method:** `GET`
- **URL:** `http://localhost:8080/api/technicians/`
- **Description:** Retrieves a list of all technicians.
- **Request Body:** N/A
- **Response:**
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
**Delete a Technician**
- **Method:** `DELETE`
- **URL:** `http://localhost:8080/api/technicians/:id/`
- **Description:** Deletes a specific technician by ID.
- **Request Body:** N/A
- **Response:**
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
- **Request Body:**
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
- **Response:**
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
**Read All Appointments**
- **Method:** `GET`
- **URL:** `http://localhost:8080/api/appointments/`
- **Description:** Retrieves a list of all appointments.
- **Request Body:** N/A
- **Response:**
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
**Update an Appointment Status to Canceled**
- **Method:** `PUT`
- **URL:** `http://localhost:8080/api/appointments/:id/cancel/`
- **Description:** Updates appointment status to canceled by ID.
- **Request Body:** N/A
- **Response:**
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
**Update an Appointment Status to Finished**
- **Method:** `PUT`
- **URL:** `http://localhost:8080/api/appointments/:id/finish/`
- **Description:** Updates appointment status to finished by ID.
- **Request Body:** N/A
- **Response:**
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
- **Request Body:** N/A
- **Response:**
    ```json
    {
	"Deleted": true
    }
    ```

## Sales microservice
### Models:
- **Salesperson** Represents salespeople. Includes "first_name", "last_name", and "employee_id". This model links salespeople to specific sales.
- **Customer** Represents customers. Includes "first_name", "last_name", "address", and "phone_number". This model links customers to specific sales.
- **Sale** Represents a sale. Includes "price", "automobile", "salesperson", and "customer". This model relies on the AutomobileVO to check if a vehicle has been sold. If the vehicle has been sold, the vehicle will not be available for sale.
- **AutomobileVO** Value object that mirrors data from the Inventory Microservice. Includes "sold" and "vin". This model is updated every 60 seconds by polling.

### CRUD Routes (Sales API):
#### Salespeople
**Create Salesperson**
- **Method:** `POST`
- **URL:** `http://localhost:8090/api/salespeople/`
- **Description:** Creates a new salesperson.
- **Request Body:**
    ```json
    {
    "first_name": "Chloe",
    "last_name": "Bennett",
    "employee_id": "cbennett"
    }
    ```
- **Response:**
    ```json
    {
    "id": 4,
    "first_name": "Chloe",
    "last_name": "Bennett",
    "employee_id": "cbennett"
    }
    ```
**Read All Salespeople**
- **Method:** `GET`
- **URL** `http://localhost:8090/api/salespeople/`
- **Description:** Retrieves a list of all salespeople.
- **Request Body:** N/A
- **Response:**
    ```json
    {
        "salespeople": [
            {
                "id": 2,
                "first_name": "Lucas",
                "last_name": "Mercer",
                "employee_id": "lmercer"
            }
        ]
    }
    ```
**Delete a Salesperson**
- **Method:** `DELETE`
- **URL:** `http://localhost:8090/api/salespeople/:id/`
- **Description:** Deletes a specific salesperson by ID.
- **Request Body:** N/A
- **Response:**
    ```json
    {
	"Deleted": true
    }
    ```

#### Customers:
**Create Customer**
- **Method:** `POST`
- **URL:** `http://localhost:8090/api/customers/`
- **Description:** Creates a new customer.
- **Request Body:**
    ```json
    {
    "first_name": "Liam",
    "last_name": "Porter",
    "address": "782 Maplewood Drive",
    "phone_number": "(919) 555-8342"
    }
    ```
- **Response:**
    ```json
    {
    "id": 1,
    "first_name": "Liam",
    "last_name": "Porter",
    "address": "782 Maplewood Drive",
    "phone_number": "(919) 555-8342"
    }
    ```
**Read All Customers**
- **Method:** `GET`
- **URL** `http://localhost:8090/api/customers/`
- **Description:** Retrieves a list of all customers.
- **Request Body:** N/A
- **Response:**
    ```json
    {
        "customers": [
            {
                "id": 1,
                "first_name": "Liam",
                "last_name": "Porter",
                "address": "782 Maplewood Drive",
                "phone_number": "(919) 555-8342"
            }
        ]
    }
    ```
**Delete a Customer**
- **Method:** `DELETE`
- **URL:** `http://localhost:8090/api/customers/:id/`
- **Description:** Deletes a specific customer by ID.
- **Request Body:** N/A
- **Response:**
    ```json
    {
	"Deleted": true
    }
    ```

#### Sales:
**Create a Sale**
- **Method** `POST`
- **URL:** `http://localhost:8090/api/sales/`
- **Description** Creates a new sale.
- **Request Body:**
    ```json
    {
	"price": 28000.00,
	"automobile": 3,
	"salesperson": 2,
	"customer": 3
    }
    ```
- **Response:**
    ```json
    {
        "price": 28000.0,
        "automobile": {
            "vin": "1C3BR5FB2BN126174",
            "sold": false
        },
        "salesperson": {
            "id": 2,
            "first_name": "Lucas",
            "last_name": "Mercer",
            "employee_id": "lmercer"
        },
        "customer": {
            "id": 3,
            "first_name": "Noah",
            "last_name": "Campbell",
            "address": "890 Brookside Avenue",
            "phone_number": "(503) 555-6739"
        }
    }
    ```
**Read All Sales**
- **Method:** `GET`
- **URL:** `http://localhost:8090/api/sales/`
- **Description:** Retrieves a list of all sales.
- **Request Body:** N/A
- **Response:**
    ```json
    {
        "sales": [
            {
                "href": "/api/sales/1/",
                "id": 1,
                "price": 26000,
                "automobile": {
                    "vin": "1C3CC5FB2AN120174",
                    "sold": false
                },
                "salesperson": {
                    "href": "/api/salespeople/4/",
                    "id": 4,
                    "first_name": "Chloe",
                    "last_name": "Bennett",
                    "employee_id": "cbennett"
                },
                "customer": {
                    "href": "/api/customers/1/",
                    "id": 1,
                    "first_name": "Liam",
                    "last_name": "Porter",
                    "address": "782 Maplewood Drive",
                    "phone_number": "(919) 555-8342"
                }
            }
	    ]
    }

**Delete a Sale**
- **Method:** `DELETE`
- **Method:** `http://localhost:8090/api/sales/:id/`
- **Description** Deletes a specific sale by ID.
- **Request Body:** N/A
- **Response:**
```json
    {
	"Deleted": true
    }
    ```
