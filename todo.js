$(document).ready(function () {

    var titre = $('.todo-title');
    var description = $('.todo-description');
    var begin = $('.todo-begin');
    var end = $('.todo-ending');
    var matter = $('.todo-matter');
    var selectMatter;
    var editMatter;
    var validate = $('.todo-save');
    var saves = [];
    var tasksPlace = $('.tasks');
    var colorCard = '';

    matter.on('click', $('.button'), function (evt) {
        selectMatter = evt.target.innerText;
    })

    tasksPlace.on('click', $('.button'), function (evt) {
        editMatter = evt.target.innerText;
    })

    validate.on('click', function () {
        verifyInputs(false, event);
    })

    tasksPlace.on('click', '.todo-save', function (event) {

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
            var beginDate = '';         
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

            var body = $(event.target).parent().parent().parent().parent();
            var titre2 = body.find($('.todo-title'));
            var invalid2 = body.find($('.invalid-edit'));
            var description2 = body.find($('.todo-description'));
            var begin2 = body.find($('.todo-begin'));
            var end2 = body.find($('.todo-ending'));

            invalid2.css('display', 'none');

            if (!titre2["0"].value.trim()) {

                body.find($('.invalid-edit')).css('display', 'block');
                return false;
            }

            saves.forEach(function (element) {

                if (!editMatter) {
                    editMatter = element.matter;
                }else{
                    element.matter = editMatter;
                }

                if (element.id == body["0"].id) {

                    element.titre = titre2["0"].value.trim();
                    element.description = description2["0"].value.trim();

                    if (begin2["0"].value) {
                        element.begin = begin2["0"].value;
                    }

                    if (end2["0"].value) {
                        element.end = end2["0"].value;

                    } else {
                        element.end = '';

                    }


                }


                contentEdited(element, body);
            });

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
        var beginHTML = '';

        if(task.begin !=''){
            beginHTML = "start : " + task.begin;
        }

        if (task.end != '') {
            endHTML = "finish : " + task.end;
        }



        switch (task.matter) {

            case 'Low':
                colorCard = ' bg-success';
                break;

            case 'Medium':
                colorCard = ' bg-warning';
                break;

            case 'High':
                colorCard = ' bg-danger';
                break;

            case '':
                colorCard = ' bg-warning';
                break;
        }
        code = '<div class="card text-white';
        code += colorCard;
        code += ' mb-3 edit" id="';
        code += task.id;
        code += '" style="max-width: 20rem;"><div class="card-header"><h4 class="card-title">'
        code += task.titre;
        code += '</h4><i class="fas fa-pencil-alt icon"></i></div><div class="card-body"><p class="card-text">';
        code += task.description;
        code += '</p><div class="todo-date">';
        code += beginHTML;
        code += '</div><div class="todo-date">';
        code += endHTML;
        code += '</div></div></div>';


        return code;
    }

    function editContent(e) {
        var card = $(e.target).parent().parent();
        var header = card.find($('.card-header'));
        var body = card.find($('.card-body'));
        var title = header.find($('.card-title'));
        var description = body.find($('.card-text'));

        editMatter='';

        var codeTitle = '<input type="text" value="';
        codeTitle += title["0"].innerText;
        codeTitle += '" class="todo-title large"><div class="invalid-edit">This task need a title !!</div>';

        var codeDescription = '<input type="text" value="';
        codeDescription += description["0"].innerText;
        codeDescription += '" class="todo-description large"><div class="body-edition"><div>date Begining</div><input type="date" name="begin" class="todo-begin"><div>ending</div><input type="date" name="ending" class="todo-ending"><div>Matter</div><div class="border-black todo-matter"><button type="button" class="btn btn-success low">Low</button><button type="button" class="btn btn-warning medium">Medium</button><button type="button" class="btn btn-danger high">High</button><button type="button" class="btn btn-info btn-lg btn-block todo-save">Save</button></div>';

        header.find($('.card-title')).replaceWith(codeTitle);

        header.find($('.icon').css('display', 'none'));

        body.find($('.card-text')).replaceWith(codeDescription);

        body.find($('.todo-date')).replaceWith('<div></div>');

    }

    function contentEdited(event, card) {



        var endTask = '';
        var beginTask = '';

        if (event.begin != '') {
            beginTask = "start : " + event.begin;
        }

        if (event.end != '') {
            endTask = "finish : " + event.end;
        }

                switch (event.matter) {
        
                    case 'Low':
                    colorCard = ' bg-success';
                        break;
        
                    case 'Medium':
                    colorCard = ' bg-warning';
                        break;
        
                    case 'High':
                    colorCard = ' bg-danger';
                        break;
        
                    case '':
                    colorCard = event.matter;
                        break;
                }

        var replaceCard = '<div class="card text-white ';
        replaceCard += colorCard;
        replaceCard += ' mb-3 edit" id="';
        replaceCard += event.id;
        replaceCard += '" style="max-width: 20rem;"><div class="card-header"><h4 class="card-title">';
        replaceCard += event.titre;
        replaceCard += '</h4><i class="fas fa-pencil-alt icon"></i></div>';
        replaceCard += '<div class="card-body"><p class="card-text">';
        replaceCard += event.description;
        replaceCard += '</p><div class="todo-date">';
        replaceCard += beginTask;
        replaceCard += '</div><div class="todo-date">';
        replaceCard += endTask;
        replaceCard += '</div></div></div>';

        card.replaceWith(replaceCard);
    }

});