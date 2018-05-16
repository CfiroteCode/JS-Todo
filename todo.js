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

    validate.on('click', function () {
        verifyInputs(false);
    })

    tasksPlace.on('click', '.todo-save', function (event) {

        console.log(titre2["0"].value);
        verifyInputs(true, event);
    })

    tasksPlace.on('click', '.icon', function (e) {
        editContent(e);
    })

    function verifyInputs(edition, event) {


        if (!edition) {
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

        } else {

            var body = $(event.target).parent().parent().parent();
            var titre2 = body.find($('.todo-title'));
            var invalid = body.find($('.invalid-feedback'));

            invalid.css('display', 'none');
        }
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

        code = task.titre;
        code += '</h4><i class="fas fa-pencil-alt icon"></i></div><div class="card-body"><p class="card-text">';
        code += task.description;
        code += '</p><div class="todo-date">start : ';
        code += task.begin;
        code += '</div><div class="todo-date">';
        code += endHTML;
        code += '</div></div></div>';

        switch (task.matter) {

            case 'Low':
                code = '<div class="card text-white bg-success mb-3 edit" id="' + task.id + '" style="max-width: 20rem;"><div class="card-header"><h4 class="card-title">' + code;
                break;

            case 'Medium':
                code = '<div class="card text-white bg-warning mb-3 edit" id="' + task.id + '" style="max-width: 20rem;"><div class="card-header"><h4 class="card-title">' + code;
                break;

            case 'High':
                code = '<div class="card text-white bg-danger mb-3 edit" id="' + task.id + '" style="max-width: 20rem;"><div class="card-header"><h4 class="card-title">' + code;
                break;

            case '':
                code = '<div class="card text-white bg-warning mb-3 edit" id="' + task.id + '" style="max-width: 20rem;"><div class="card-header"><h4 class="card-title">' + code;
                break;
        }
        return code;
    }

    function editContent(e) {
        var card = $(e.target).parent().parent();
        var header = card.find($('.card-header'));
        var body = card.find($('.card-body'));

        header.find($('.card-title')).replaceWith('<input type="text" placeholder="Todo Title..." class="todo-title large"><div class="invalid-feedback">This task need a title !!</div>');

        header.find($('.icon').css('display', 'none'));



        body.find($('.card-text')).replaceWith('<input type="text" placeholder="Todo Description..." class="todo-description large"><div>date Begining</div><input type="date" name="begin" class="todo-begin"><div>ending</div><input type="date" name="ending" class="todo-ending"><div>Matter</div><div class="border-black todo-matter"><button type="button" class="btn btn-success low">Low</button><button type="button" class="btn btn-warning medium">Medium</button><button type="button" class="btn btn-danger high">High</button><button type="button" class="btn btn-info btn-lg btn-block todo-save">Save</button>');

        body.find($('.todo-date')).replaceWith('<div></div>');

    }

});