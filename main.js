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
                    <img src="${user.picture.large}">
                    <p><span>Gender:</span><br/><span class="gender-styled">${user.gender}</span></p>
                    <p><span>Age:</span><br/>${user.dob.age} y.o.</p><br/>
                    <p><span>Living in:</span><br/><a class="my-link" href="https://maps.google.com/?q= ${user.location.city} ${user.location.street.name}"> ${user.location.postcode}, ${user.location.street.name} ${user.location.street.number}, ${user.location.city}, ${user.location.state}, ${user.location.country} (${user.nat})</a></p>
                    <p><span>Current location:</span><iframe class="map" src="https://maps.google.com/maps?q=${user.location.coordinates.latitude},${user.location.coordinates.longitude}&hl=en&z=1&amp;output=embed" frameborder="0" allowfullscreen></iframe>
                    <p><span>Email:</span><a class="my-link" href="mailto:${user.email}"> ${user.email}</a></p>
                    <p><span>Cell:</span><a class="my-link" href="tel:${user.cell}"> ${user.cell}</a></p>                                 
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
