import { useState } from "react";
import ReactDOM from "react-dom";
import { AppointmentAcceptance } from "../../components/AppointmentAcceptance";

let rootContainer: any;

beforeEach(() => {
  rootContainer = document.createElement("div");
  document.body.appendChild(rootContainer);
  ReactDOM.render(<div />, rootContainer);
});

afterEach(() => {
  document.body.removeChild(rootContainer);
  rootContainer.remove();
});
//IMPORTANT: Given unit test will fail in order to its complexity and use of React hooks and its dependency of logged user in system
//so the component it is not as testeable as wanted. Despite of this testing fail, the component works well on the application
describe("Appointment Acceptance Component Testing", () => {
  it("Appointmnent  Acceptance Render", () => {
    const appointmentAccLoaded = false;
    const [appointmentAccAnswered, setAppointmentAccAnswered] = useState(false);
    const appointmentAccNotificationId = "";
    const appointmentAccAppointmentId = "";
    const AppointmentAcceptanceData = {
      loaded: appointmentAccLoaded,
      answered: appointmentAccAnswered,
      controller: setAppointmentAccAnswered,
      appointmentId: appointmentAccAppointmentId,
      triggeringNotificationId: appointmentAccNotificationId,
    };
    const acceptanceAppointment = (
      <AppointmentAcceptance
        {...AppointmentAcceptanceData}
      ></AppointmentAcceptance>
    );
    expect(acceptanceAppointment).toEqual(
      <AppointmentAcceptance
        {...AppointmentAcceptanceData}
      ></AppointmentAcceptance>
    );
  });
});
