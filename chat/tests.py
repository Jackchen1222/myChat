from django.test import TestCase, Client

class SimpleTest(TestCase):
    def test_login(self):
        c = Client(HTTP_USER_AGENT='Mozilla/5.0')
        response = c.post('userlogin', {'username': 'chenbin', 'password': 'chenbin123', 'logintype': '0'})
        self.assertSetEqual(response.status_code, 200)
