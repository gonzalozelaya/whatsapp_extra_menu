/* @odoo-module */

import { _t } from "@web/core/l10n/translation";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";

const threadActionsRegistry = registry.category("mail.thread/actions");

// Añadir la acción personalizada para crear un contacto
threadActionsRegistry.add("view-contact", {
    // Condición para mostrar el botón solo si chatWindow está disponible
    condition(component) {
        return component.props.chatWindow && component.props.chatWindow.thread.type === "whatsapp";
    },
    icon: "fa fa-fw fa-user",
    name: _t("Modificar contacto"),
    async open(component) {
        const orm = component.env.services.orm;
        const phoneNumber = component.props.chatWindow.thread.name;  // Número de teléfono en el campo 'name'

        if (phoneNumber) {
            // Llama al método find_or_create_from_number_public para buscar o crear el contacto
            const partner = await orm.call("res.partner", "find_or_create_from_number_public", [phoneNumber]);
            
            if (partner) {
                // Redirige a la vista de formulario del contacto encontrado o creado
                //console.log('Go to partner')
                //console.log(partner.id)
                component.env.services.action.doAction({
                    type: "ir.actions.act_window",
                    res_model: "res.partner",
                    res_id: partner.id,
                    views: [[false, "form"]],
                    target: "new",
                });
            }
        }
    },
    sequence: 20,
});

// Botón para crear un lead con los datos del cliente
threadActionsRegistry.add("create-lead", {
    condition(component) {
        return component.props.chatWindow && component.props.chatWindow.thread.type === "whatsapp";
    },
    icon: "fa fa-fw fa-briefcase",
    name: _t("Crear Oportunidad"),
    async open(component) {
        const orm = component.env.services.orm;
        const phoneNumber = component.props.chatWindow.thread.name;

        if (phoneNumber) {
            // Buscar o crear el contacto primero
            const partner = await orm.call("res.partner", "find_or_create_from_number_public", [phoneNumber]);
            
            if (partner) {
                // Abre la ventana de creación de lead, con los datos precargados del cliente
                component.env.services.action.doAction({
                    type: "ir.actions.act_window",
                    res_model: "crm.lead",
                    views: [[false, "form"]],
                    target: "new",
                    context: {
                        default_partner_id: partner.id,  // Asigna el cliente como el contacto principal
                        default_contact_name: partner.name,  // Nombre del contacto
                        default_phone: partner.phone || partner.mobile, //Teléfono
                        default_mobile: partner.mobile,
                        default_email_from: partner.email,  // Correo electrónico del contacto
                    },
                });
            }
        }
    },
    sequence: 30,
});
