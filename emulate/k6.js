import http from "k6/http";
import {sleep} from "k6";
import {Rate} from 'k6/metrics';

const myFailRate = new Rate('failed_requests');

const headers = {
    'User-Agent': 'k6',
    'Content-Type': 'application/json',
};

function typeFromNumber(num) {
    switch (num) {
        case 0:
            return "GREEN"
        case 1:
        case 2:
            return "RED"
        default:
            return "YELLOW"
    }
}


export default function () {
    const request = {
        "type": typeFromNumber(Math.floor(Math.random() * 5)),
        "amount": Math.floor(Math.random() * 20)
    }
    const res = http.post(`http://127.0.0.1:8080/apples/buy`, JSON.stringify(request), {headers})
    myFailRate.add(res.status !== 200);
    sleep(0.01);
};
