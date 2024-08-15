var list = document.querySelector(".list");
var listItem = document.querySelectorAll(".list-item");

function updateList() {
    let moduleIndex = 0;
    let lessionIndex = 0;

    Array.from(list.children).forEach(function (item) {
        if (item.classList.contains("active")) {
            moduleIndex++;
            var itemquerry = item.querySelector("span")
                ? item.querySelector("span").innerText
                : item.innerText;
            item.innerHTML = `Module ${moduleIndex}: <span>${itemquerry}</span>`;
        } else {
            lessionIndex++;
            item.innerHTML = `Bài ${lessionIndex}: <span>${itemquerry}</span>`;
        }
    });
}

updateList();

var dragEl;
let dragElContent;

list.addEventListener("dragstart", function (e) {
    dragEl = e.target;
    dragElContent = dragEl.innerHTML;

    list.addEventListener("dragover", handleDragOver);
    list.addEventListener("dragend", handleDragEnd);
});

var getMouseOffset = function (e) {
    var targetMouse = e.target.getBoundingClientRect();
    var offset = {
        x: e.pageX - targetMouse.left,
        y: e.pageY - targetMouse.top,
    };
    return offset;
};

var getMiddleElement = function (e) {
    var targetMiddle = e.target.getBoundingClientRect();

    return (targetMiddle.bottom - targetMiddle.top) / 2;
};

function handleDragOver(e) {
    e.preventDefault();
    var targetEl = e.target.closest(".list-item");

    if (targetEl && targetEl !== dragEl && targetEl.nodeName === "DIV") {
        const keepDrag = getMouseOffset(e);
        const middleEl = getMiddleElement(e);

        if (keepDrag.y > middleEl) {
            if (targetEl.nextElementSibling) {
                list.insertBefore(dragEl, targetEl.nextElementSibling);
            } else {
                list.appendChild(dragEl);
            }
        } else {
            list.insertBefore(dragEl, targetEl);
        }

        dragEl.innerHTML = dragElContent;
    }
}

function handleDragEnd(e) {
    e.preventDefault();
    dragEl.classList.remove("blur");

    updateList();

    list.removeEventListener("dragover", handleDragOver);
    list.removeEventListener("dragend", handleDragEnd);
}
