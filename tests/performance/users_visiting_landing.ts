import http from 'k6/http';
import { check, sleep } from 'k6';

// Test configuration
export const options = {
  thresholds: {
    // Assert that 99% of requests finish within 3000ms.
    http_req_duration: ['p(99) < 3000']
  },
  stages: [
    { duration: '30s', target: 25 },
    { duration: '30s', target: 15 },
    { duration: '20s', target: 0 }
  ]
};

export default function () {
  // Ensures that the landing page is accessible under load
  const res = http.get('https://dev-musc.space-crammers.earth/');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
