B. Галактические Вести (15 баллов)
Космическая журналистика — только для настоящих межзвёздных акул пера. Редакция издания «Галактические Вести» пользуется самыми надёжными способами связи со своими косморепортёрами и даже придумала свой формат передачи данных.
Для отправки сообщения необходимо указать адрес получателя, добавить разделитель в виде символа двоеточия и ввести текст сообщения в фигурных скобках. Сообщение может содержать любой текст, а вот адрес задается согласно правилу: галактика/планетарная_система/планета. Название галактики содержит от 2 до 8 заглавных латинских букв, дефис, а затем от 2 до 8 цифр. Планетарная система — непустая последовательность заглавных латинских букв и дефисов, в которой запрещено использовать два дефиса подряд, а также дефисы в начале и в конце последовательности. Планета — непустая последовательность заглавных латинских букв. Из-за религиозных взглядов главного редактора издания запрещено использовать подстроку UNDEFINED внутри названия планеты.
Издания-конкуренты не дремлют: постоянно норовят перехватить сообщения ваших репортёров и изменить их до неузнаваемости. Они почему-то всегда вставляют свои правки внутри специальных символов @, например @фейковая новость@. Вам точно известно, что символы всегда парные, никогда не вкладываются друг в друга, а используют их только конкуренты.
Ваша задача — разработать устройство, которое будет выхватывать из межзвёздного эфира сообщения ваших репортёров. Для этого нужно отсеять все сообщения, которые не соответствуют протоколу редакции, и, если в сообщении есть послания от конкурентов, обернуть каждое из них в теги <fake></fake> вместо символов @, чтобы их можно было передать в отдел фейковых новостей.

Формат ввода
[  
    "GALAXY-42/SYSTEM/PLANET:{}",  
    "GALAXY-42/SYSTEM/PLANET:{Message}",  
    "GALAXY-42/System/PLANET:{Message}",  
    "GALAXY-42/SYSTEM/PLANET{Message}",  
    "LONGGALAXY-42/SYSTEM/PLANET:{Message}",  
    "GALAXY-4/SYSTEM/PLANET:{Message}",  
    "GALAXY-4815162342/SYSTEM/PLANET:{Message}",  
    "GALAXY-42/THE-SOLAR-SYSTEM/PLANET:{Message}",  
    "GALAXY-42/-SYSTEM/PLANET:{Message}",  
    "GALAXY-42/SYSTEM1/PLANET:{Message}",  
    "GALAXY-42/SYS--TEM/PLANET:{Message}",  
    "GALAXY-42/ERROR/NIL:{Message}",  
    "GALAXY-42/ERROR/NULL:{Message}",  
    "GALAXY-42/ERROR/UNDEFINED:{Message}",  
    "GALAXY-42/TYPE/ISNOTUNDEFINED:{Message}",  
    "GALAXY-42/SYSTEM/PLANET:{Simple text... @null == undefined@}",  
    "GALAXY-42/SYSTEM/PLANET:{@typeof null@@typeof typeof null@}"  
]
Формат вывода
[  
    "GALAXY-42/SYSTEM/PLANET:{}",  
    "GALAXY-42/SYSTEM/PLANET:{Message}",  
    "GALAXY-42/THE-SOLAR-SYSTEM/PLANET:{Message}",  
    "GALAXY-42/ERROR/NIL:{Message}",  
    "GALAXY-42/ERROR/NULL:{Message}",  
    "GALAXY-42/SYSTEM/PLANET:{Simple text... <fake>null == undefined</fake>}",  
    "GALAXY-42/SYSTEM/PLANET:{<fake>typeof null</fake><fake>typeof typeof null</fake>}"  
]
Примечания
Файл с решением требуется оформить по шаблону:

module.exports = function (input) {  
    // ...  
    return result;  