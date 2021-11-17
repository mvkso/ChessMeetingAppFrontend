import {useState, useEffect} from "react";
import {Schedule, Inject, ScheduleComponent, Day, Week, WorkWeek, Month
    , Agenda, MonthAgenda, ViewDirective, ViewsDirective,
    TimelineViews, TimelineMonth, ResourceDirective, ResourcesDirective} from "@syncfusion/ej2-react-schedule";



import axios from "axios";

import React from "react";
import authentication from "../../scripts/authentication";

import moment from "moment";
import Title from "../../Title";

const CalendarPage = (props) => {

    const [scheduleObject, setScheduleObject] = useState(new Schedule());


    return(
        <section className="adminSection" style={{display: "flex", alightItems: "center", flexDirection: "column", padding: "1em", height: "100vh"}}>
            <Title style={{fontFamily: 'Major Mono Display',color: "darkblue", fontWeight: "bold"}}>your meetings</Title>

            <ScheduleComponent  popupOpen={false}  rowAutoHeight={true} width='100%' currentView='Month' /* ref={t => setScheduleObject(t)}  eventClick={onAppointmentClick}  eventSettings={{dataSource: schedules}} */>
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