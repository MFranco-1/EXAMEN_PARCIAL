from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Usuario de prueba
USUARIO_VALIDO = "Alessandra"
CONTRASENA_VALIDA = "2104"

# Productos de prueba
productos = {
    "P001": {
        "codigo": "P001",
        "nombre": "Paca Premium de Blusas",
        "categoria": "Ropa femenina",
        "precio": 350
    },
    "P002": {
        "codigo": "P002",
        "nombre": "Paca de Casacas Denim",
        "categoria": "Ropa urbana",
        "precio": 480
    },
    "P003": {
        "codigo": "P003",
        "nombre": "Paca de Polos Oversize",
        "categoria": "Ropa juvenil",
        "precio": 300
    },
    "P004": {
        "codigo": "P004",
        "nombre": "Paca de Ropa Deportiva",
        "categoria": "Moda fitness",
        "precio": 520
    },
    "P005": {
        "codigo": "P005",
        "nombre": "Paca Premium de Vestidos",
        "categoria": "Ropa femenina",
        "precio": 450
    },
    "P006": {
        "codigo": "P006",
        "nombre": "Pantalón Cargo Mujer",
        "categoria": "Prenda individual",
        "precio": 45
    },
    "P007": {
        "codigo": "P007",
        "nombre": "Blusa Satinada Importada",
        "categoria": "Prenda individual",
        "precio": 38
    },
    "P008": {
        "codigo": "P008",
        "nombre": "Set Deportivo Mujer",
        "categoria": "Moda deportiva",
        "precio": 65
    }
}

@app.route("/")
def inicio():
    return jsonify({"mensaje": "Backend Flask funcionando correctamente"})


@app.route("/login", methods=["POST"])
def login():
    datos = request.get_json()

    usuario = datos.get("usuario")
    contrasena = datos.get("contrasena")

    if usuario == USUARIO_VALIDO and contrasena == CONTRASENA_VALIDA:
        return jsonify({
            "success": True,
            "mensaje": "Login correcto"
        })
    else:
        return jsonify({
            "success": False,
            "mensaje": "Usuario o contraseña incorrectos"
        }), 401


@app.route("/producto/<codigo>", methods=["GET"])
def buscar_producto(codigo):
    producto = productos.get(codigo.upper())

    if producto:
        return jsonify({
            "success": True,
            "producto": producto
        })
    else:
        return jsonify({
            "success": False,
            "mensaje": "Producto no encontrado"
        }), 404


if __name__ == "__main__":
    app.run(debug=True)