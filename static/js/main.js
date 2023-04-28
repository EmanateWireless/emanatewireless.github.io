$(document).ready(function(){
    $(document).ajaxStart(function() {
        btnhtml = $('.btn-submit').html();
        $('.btn-submit').html('<img src="/static/media/spin.gif" alt="Sending">');
    }).ajaxStop(function() {
        $('.btn-submit').html(btnhtml);
    });

    $("#contact-form").submit(function(event) {
        event.preventDefault();
        $('.btn-submit').prop('disabled', true);
        var valid = true;
        $("#contact-form *[required]").each(function(){
            if ($.trim($(this).val()) == '') {
                $(this).addClass('error');
                valid = false;
            }
            else {
                $(this).removeClass('error');
            }
        });
        if (!valid) {
            $('#contact-output').text("Please fill out all fields.");
            $('.btn-submit').prop('disabled', false);
        }
        else {

            recipient_email = 'support@emanatewireless.com';
            subject = 'General Inquiry Submission';
            sender_email = $('#contact-email').val();
            message = $('#contact-name').val() + '\n' + $('#contact-email').val() + '\n' + $("#contact-message").val();
            send_email(recipient_email, subject, sender_email, message);
        }
    });

    $("#company-contact-form").submit(function(event) {
        event.preventDefault();
        $('.btn-submit').prop('disabled', true);
        var valid = true;
        $("#company-contact-form *[required]").each(function(){
            if ($.trim($(this).val()) == '') {
                $(this).addClass('error');
                valid = false;
            }
            else {
                $(this).removeClass('error');
            }
        });
        if (!valid) {
            $('#contact-output').text("Please fill out all fields.");
            $('.btn-submit').prop('disabled', false);
        }
        else {

            redirect = null;
            recipient_email = 'support@emanatewireless.com';
            subject = $('#contact-subject').val();
            sender_email = $('#contact-email').val();
            message = $('#contact-name').val() + '\n' + $('#contact-email').val() + '\n' + $("#contact-company").val();
            if (document.getElementById('contact-redirect')){
                redirect = $('#contact-redirect').val();
            }
            send_email(recipient_email, subject, sender_email, message, redirect);

        }
    });

    $("#youtube_modal").on('hidden.bs.modal', function (e) {
        $("#youtube_modal iframe").attr("src", $("#youtube_modal iframe").attr("src"));
    });
});


function send_email(recipient_email, subject, sender_email, message, redirect = null){
    $.ajax({
        type: "POST",
        url: "https://api.coderedcorp.com/email/send/",
        headers: {
            "Authorization": "Token z1WJdacnHKtxHUabwvZH",
        },
        data: {
            'recipient_email': recipient_email,
            'subject': subject,
            'sender_email': sender_email,
            'message': message,
        }
    }).done(function(response) {
        $('#contact-output').text("Thank you! Your message has been sent.");
        if (redirect){
            window.location.replace(redirect);
        }
    }); 
}

