# -*- coding: utf-8 -*-

from odoo import models, api

class ResPartner(models.Model):
    _inherit = 'res.partner'

    @api.model
    def find_or_create_from_number_public(self, number, name=False):
        # Llama internamente al método privado
        partner = self._find_or_create_from_number(number, name)
        return partner.sudo().read(['id', 'name', 'phone', 'email'])[0]