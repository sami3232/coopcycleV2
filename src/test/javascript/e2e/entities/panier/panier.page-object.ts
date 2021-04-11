import { element, by, ElementFinder } from 'protractor';

export class PanierComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-panier div table .btn-danger'));
  title = element.all(by.css('jhi-panier div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class PanierUpdatePage {
  pageTitle = element(by.id('jhi-panier-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  prixInput = element(by.id('field_prix'));

  produitSelect = element(by.id('field_produit'));
  utilisateurSelect = element(by.id('field_utilisateur'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setPrixInput(prix: string): Promise<void> {
    await this.prixInput.sendKeys(prix);
  }

  async getPrixInput(): Promise<string> {
    return await this.prixInput.getAttribute('value');
  }

  async produitSelectLastOption(): Promise<void> {
    await this.produitSelect.all(by.tagName('option')).last().click();
  }

  async produitSelectOption(option: string): Promise<void> {
    await this.produitSelect.sendKeys(option);
  }

  getProduitSelect(): ElementFinder {
    return this.produitSelect;
  }

  async getProduitSelectedOption(): Promise<string> {
    return await this.produitSelect.element(by.css('option:checked')).getText();
  }

  async utilisateurSelectLastOption(): Promise<void> {
    await this.utilisateurSelect.all(by.tagName('option')).last().click();
  }

  async utilisateurSelectOption(option: string): Promise<void> {
    await this.utilisateurSelect.sendKeys(option);
  }

  getUtilisateurSelect(): ElementFinder {
    return this.utilisateurSelect;
  }

  async getUtilisateurSelectedOption(): Promise<string> {
    return await this.utilisateurSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class PanierDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-panier-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-panier'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
