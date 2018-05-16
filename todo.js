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

    tasksPlace.on('click',$('.edit'),function(e){
        console.log(e);
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
            id: 'task-' + (saves.length + 1),
            titre: titre["0"].value.trim(),
            description: textdescrip,
            begin: beginDate,
            end: endinDate,
            matter: importance,
            done: false
        }

        saves.push(task);
        titre.val('');
        description.val('');
        begin.val('');
        end.val('');
        tasksPlace.append(taskToHTML(task));
    }

    function savesChange() {
        saves.forEach(function (task) {
            tasksPlace.append(taskToHTML(task));
        })
    }

    function taskToHTML(task) {

        var code;
        var endHTML = '';

        if (task.end != '') {
            endHTML = "finish : " + task.end;
        }

        switch (task.matter) {

            case 'Low':
                code = '<div class="card text-white bg-success mb-3" style="max-width: 20rem;"><div class="card-header"><h4 class="card-title">';
                code += task.titre;
                code += '</h4><i class="fas fa-pencil-alt edit"></i></div><div class="card-body"><p class="card-text">';
                code += task.description;
                code += '</p><div class="todo-date">start : ';
                code += task.begin;
                code += '</div><div class="todo-date">';
                code += endHTML;
                code += '</div></div></div>';
                break;

            case 'Medium':
                code = '<div class="card text-white bg-warning mb-3" style="max-width: 20rem;"><div class="card-header"><h4 class="card-title"> ';
                code += task.titre;
                code += '</h4><i class="fas fa-pencil-alt edit"></i></div><div class="card-body"><p class="card-text">';
                code += task.description;
                code += '</p><div class="todo-date">start : ';
                code += task.begin;
                code += '</div><div class="todo-date">';
                code += endHTML;
                code += '</div></div></div>';
                break;

            case 'High':
                code = '<div class="card text-white bg-danger mb-3" style="max-width: 20rem;"><div class="card-header"><h4 class="card-title">';
                code += task.titre;
                code += '</h4><i class="fas fa-pencil-alt edit"></i></div><div class="card-body"><p class="card-text">';
                code += task.description;
                code += '</p><div class="todo-date">start : ';
                code += task.begin;
                code += '</div><div class="todo-date">';
                code += endHTML;
                code += '</div></div></div>';
                break;

            case '':
                code = '<div class="card text-white bg-warning mb-3" style="max-width: 20rem;"><div class="card-header"><h4 class="card-title">';
                code += task.titre;
                code += '</h4><i class="fas fa-pencil-alt edit"></i></div><div class="card-body"><p class="card-text">';
                code += task.description;
                code += '</p><div class="todo-date">start : ';
                code += task.begin;
                code += '</div><div class="todo-date">';
                code += endHTML;
                code += '</div></div></div>';
                break;
        }
        return code;
    }

});