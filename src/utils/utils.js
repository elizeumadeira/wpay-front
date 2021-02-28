const color_status = (status_code) => {
    if(status_code == 200){
        return 'ok';
    }else if(status_code >=300 && status_code <= 399){
        return 'alerta';
    }else if(status_code === null || status_code == 'null'){
        return 'sem';
    }else{
        return 'bad';
    }
};

export default {
    // url_base: 'http://127.0.0.1:8000', // php artisan serve
    url_base: 'http://127.0.0.1:8096/', // docker-compose
    color_status,
    dot_status_code: function(status_code){
        return (
            <small className={`dot ${color_status(status_code)}`}></small>
        )
    }
};