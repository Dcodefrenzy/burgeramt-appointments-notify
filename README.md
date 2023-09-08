# Anmeldung-appointments-notify

This is a simple tool that checks service.berlin.de for appointments at intervals of 3 minutes/180secs. Upon discovering an available appointment, it triggers an audible alert for people.

This tool was born out of the frustration of constantly monitoring Bürgeramt websites for elusive appointment openings. With it, you can now utilize your time more efficiently, whether

- it's settling into your new apartment,
- focusing on work,
- or diving into your studies.

It's crucial to clarify that this tool does not perform appointment bookings, nor does it attempt to outmaneuver others with less coding expertise to secure better appointments. Its sole purpose is to provide timely notifications when Anmeldung appointments become available on service.berlin.de.

# For Developers:

For developers, this tool is open source and can be easily installed on your computer..

# For Non-Developers:

We're planning to launch this tool as a Telegram bot or a website. By using it, you'll receive notifications whenever appointments become available. It's essential to note that this tool doesn't assist in securing appointments but rather allows you to make the most of your time while waiting for appointment dates.

# Setup

1. Install Requirements

```
- Node Js >= 18.12.1
- Typescript: ^4.8.3
- Npm >= 8.19.2
```

2. Dependencies
   create a .env file and add these dependencies

```bash
    PORT = "Your port" (Your code run using this dependency.)
    USER_MAIL ="your email" (This mail is added to the header while sending request to the service.berlin.de site)
    SCRIPT_ID="https://service.berlin.de/dienstleistung/120686/" (THis should also be added to the headers while sending request.)
```

3.  Install the script
    Run this command in your terminal:

```bash
npm install (To install all dependencies)

npm run dev (to run the project locally)

```

### Endpoints

First of all, here is a overview of all the API endpoints that comprise the authentication of the project, append `http://localhost:(your port)/api/v1/appointment` before the individual endpoints.

| Method | Endpoint | Description                     |
| ------ | -------- | ------------------------------- |
| GET    | /        | get appointment and notifiy you |
