# -*- coding: utf-8 -*-
{
    'name': "whatsapp_extra_menu",

    'summary': """
        This module adds two extra buttons to whatsapp chatter. One to modify the contact related and another to create a lead""",

    'description': """
        This module adds two extra buttons to whatsapp chatter. One to modify the contact related and another to create a lead
    """,

    'author': "OutsourceArg",
    'website': "https://www.outsourcearg.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/master/odoo/addons/base/module/module_data.xml
    # for the full list
    'category': 'Uncategorized',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['mail'],
    "assets": {
        "web.assets_backend": [
            "change_date_planned_on_purchase/static/src/js/threadActions.js",
        ],
    },
}