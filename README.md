### [Link to backend](https://github.com/Iluhaprog/prototech-test)

### before run
1. Create .env file in root and add next
```env
REACT_APP_API_URL=http://localhost:8000
```
instead localhost:8000 you can paste you api host

### to run
```bash
npm run start
```
### run with docker
1. run `docker build -t test-front-proto .`
2. run `sudo docker run -p 3000:3000 test-front-proto`