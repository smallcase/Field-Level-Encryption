# Youtube Search

## Running the project

1. Export env file
2. Install MongoDB
3. Install Node Js
4. Run following commands

```
npm install
node index
```

## API

### 1. Get Data

```
curl -XGET 'localhost:8900/?email=sample@example.com'
```

### 2. Add Data

```
curl -XPOST -H "Content-type: application/json" -d '{
    "name": "Test User",
     "email": "sample@example.com",
     "phone": "9999999999"
}' 'localhost:8900/'
```

### 3. Agreegation

```
curl -XGET 'localhost:8900/aggregate?email=sample@example.com'
```

## Benchmarking

### 1. Install autocannon

```
npm i auto autocannon
```

### 2. Command

```
autocannon -c 100 -d 5 http://localhost:8900/?email=sample@example.com
```

## 3. Benchmarking the Get API

### a. Disabling Encryption

-   Remove getters and setters from users model to disable encryption

### b. Enabling Encryption

-   Add the getters and setters back to enable encryption
