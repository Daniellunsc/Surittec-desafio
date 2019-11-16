import React from 'react';

const NotAutorized = () => (
    <div class="card" style={{width: "18rem"}}>
        <div class="card-body">
            <h5 class="card-title">Parece que você não pode acessar este recurso :(</h5>
            <a href="/home" class="btn btn-primary">Ir para home</a>
        </div>
    </div>
)


export default NotAutorized;