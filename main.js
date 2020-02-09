$('.fa-user-times').on('click', function(){
    location.reload(true);
});

$.ajax({
    url: 'https://randomuser.me/api/',
    datatype: 'json',
    method: 'GET',
    success: function(data){
        console.log(data);
        data.results.forEach(function(user) {
            // debugger;
            $('.main').html($(`
                <img class="face-img" src="${user.picture.large}">
                <h2 class="first-name">${user.name.first}</h2>
                <h2 class="last-name">${user.name.last}</h2>
            `));

            $('#myModal').find('.modal-content').html(`
                <div class="modal-header">
                    <h3>${user.name.title} ${user.name.first} ${user.name.last}</h3>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                    <img src="${user.picture.large}"> <br/>
                    <p><span>Gender:</span> ${user.gender}</p>
                    <p><span>Y.o:</span> ${user.dob.age}</p>
                    <p><span>Location:</span> ${user.location.postcode}, ${user.location.street.name} ${user.location.street.number}, ${user.location.city}, ${user.location.state}, ${user.location.country} (${user.nat})</p>
                    ${user.location.coordinates.latitude}; ${user.location.coordinates.longitude} <br/><br/>
                    <p><span>Email:</span> ${user.email}</p>
                    <p><span>Cell:</span> ${user.cell}</p>                                 
                </div>
            `);
        });
    },
    error: function(){
        $('.main').html($(`
            <img class="face-img" src="loading.gif">
            <h2 class="ups">Ups! Pobieranie danych trwa zbyt długo. Spróbuj ponownie później.</h2>
        `));
        $('.decide').remove();
    }
});
