function ServiceAppointmentList() {
    return (
        <>
            <h1>Service Appointments</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Is VIP?</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th></th>
                    </tr>
                </thead>
            </table>
        </>
    )
}
export default ServiceAppointmentList;
