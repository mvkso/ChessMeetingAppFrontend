import {useState, useEffect} from "react";
import {Schedule, Inject, ScheduleComponent, Day, Week, WorkWeek, Month
    , Agenda, MonthAgenda, ViewDirective, ViewsDirective,
    TimelineViews, TimelineMonth} from "@syncfusion/ej2-react-schedule";


import React from "react";
import authentication from "../../scripts/authentication";


import Title from "../../Title";

const CalendarPage = (props) => {

    const[createdReservations, setCreatedReservations] = useState([]);
    const[bookedReservations, setBookedReservations] = useState([]);
    const[userDetails, setUserDetails] = useState([]);


    useEffect( ()=> {
        fetch(`http://localhost:8080/userDetails/userId/${authentication.getCurrentUser().id}`,{ headers: authentication.authenticationHeader() })
            .then((res) => res.json())
            .then((userDetails1) => {
                setUserDetails(userDetails);
                fetch(`http://localhost:8080/reservations/user/${userDetails1.userDetailsId}/created`,
                    { headers: authentication.authenticationHeader() })
                    .then((res) => res.json())
                    .then((createdReservations1) => setCreatedReservations(createdReservations1))
                    .then(
                        fetch(`http://localhost:8080/reservations/user/${userDetails1.userDetailsId}/booked`,
                            { headers: authentication.authenticationHeader() })
                            .then((res) => res.json())
                            .then((bookedReservations1) => setBookedReservations(bookedReservations1))

                    )})
    }, [])


    return(
        <section className="adminSection" style={{display: "flex", alightItems: "center", flexDirection: "column", padding: "1em", height: "100vh"}}>
            <Title style={{fontFamily: 'Major Mono Display',color: "darkblue", fontWeight: "bold"}}>your meetings</Title>

            <ScheduleComponent  popupOpen={false}  rowAutoHeight={true} width='100%' currentView='Month' eventSettings={{dataSource: [...createdReservations,...bookedReservations]}}/* ref={t => setScheduleObject(t)}  eventClick={onAppointmentClick}   */>
                <ViewsDirective>
                    <ViewDirective option='Day'/>
                    <ViewDirective option='Week'/>
                    <ViewDirective option='Month'/>
                    <ViewDirective option='Agenda'/>
                    <ViewDirective option='MonthAgenda'/>
                    <ViewDirective option='TimelineDay'/>
                    <ViewDirective option='TimelineMonth'/>
                </ViewsDirective>
                {/*<ResourcesDirective>*/}
                {/*    <ResourceDirective field='Subject' colorField = 'Color' textField='Subject' idField={'Subject'} dataSource={resourceDataSource}>*/}

                {/*    </ResourceDirective>*/}
                {/*</ResourcesDirective>*/}
                <Inject services={[Day, Week, WorkWeek, Month, Agenda, MonthAgenda, TimelineViews, TimelineMonth]} />
            </ScheduleComponent>
            {/*<p>{currentScheduleId}</p>*/}

        </section>

    );

};
export default CalendarPage;