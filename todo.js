$(document).ready(function () {

    var titre = $('.todo-title');
    var description = $('.todo-description');
    var begin = $('.todo-begin');
    var end = $('.todo-ending');
    var matter = $('.todo-matter');
    var selectMatter;
    var validate = $('.todo-save');
    var saves = [];
    var tasksPlace = $('.tasks');

    matter.on('click', $('.button'), function (evt) {
        selectMatter = evt.target.innerText;
    })

    validate.on('click', function (event) {
        verifyInputs();
    })

    function verifyInputs() {

        $('.invalid-feedback').css('display', 'none');

        if (!titre["0"].value.trim()) {
            $('.invalid-feedback').css('display', 'block');
            return false;
        }

        var textdescrip = description["0"].value.trim();
        var beginDate = Date.now();
        var endinDate = end["0"].value;
        var importance = '';

        if (begin["0"].value) {
            beginDate = begin["0"].value;
        }

        if (selectMatter) {
            importance = selectMatter;
        }

        var task = {
            id:'task-' + (saves.length + 1),
            titre : titre["0"].value.trim(),
            description : textdescrip,
            begin : beginDate,
            end : endinDate,
            matter : importance,
            done : false
        }

        saves.push(task);
        titre.val('');
        description.val('');
        begin.val('');
        end.val('');
        tasksPlace.append(taskToHTML(task));
    }

    function savesChange(){
        saves.forEach(function(task){
            tasksPlace.append(taskToHTML(task));
        })
    }

    function taskToHTML(task){

        var code;

        switch(task.matter){

            case 'Low':
            code = '<div class="card text-white bg-success mb-3" style="max-width: 20rem;"><div class="card-header">Header</div><div class="card-body"><h4 class="card-title">Success card title</h4><p class="card-text">Some quick example text to build on the card title and make up the bulk of the card content.</p></div></div>';
            break;

            case 'Medium':
            code = '<div class="card text-white bg-warning mb-3" style="max-width: 20rem;"><div class="card-header">Header</div><div class="card-body"><h4 class="card-title">Success card title</h4><p class="card-text">Some quick example text to build on the card title and make up the bulk of the card content.</p></div></div>';
            break;

            case 'High':
            code = '<div class="card text-white bg-danger mb-3" style="max-width: 20rem;"><div class="card-header">Header</div><div class="card-body"><h4 class="card-title">Success card title</h4><p class="card-text">Some quick example text to build on the card title and make up the bulk of the card content.</p></div></div>';
            break;

            case '':
            code = '<div class="card text-white bg-warning mb-3" style="max-width: 20rem;"><div class="card-header">Header</div><div class="card-body"><h4 class="card-title">Success card title</h4><p class="card-text">Some quick example text to build on the card title and make up the bulk of the card content.</p></div></div>';
            break;
        }
        return code;
    }

});