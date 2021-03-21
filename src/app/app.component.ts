import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { centerText } from './custom-methods-jsPDF';

@Component({
  	selector: 'app-root',
  	templateUrl: './app.component.html',
  	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  	doc: jsPDF;
  	title = 'jsPDF';
	pathIframe: string;
	beginValoracionCualitativaTable: number = 88;
	beginValoracionCuantitativaTable: number;
	beginTextArea: number;
	beginObservaciones: number;
	marginTopTextArea: number = 15.5;
	marginBottomTextArea: number = 7;
	marginTopObservaciones: number = 8;

  	constructor() { }

	ngOnInit(): void {
		
		this.customMethodsJSPDF();
		// @ts-ignore
		this.doc = new jsPDF({
			orientation: 'portrait',
			format: 'legal',
			// unit: 'px',
			// hotfixes: ['px_scaling']
		});

		this.addFonts();
		this.headerInstitucional();
		this.headerBoletin();
		this.setNameEstudiante();
		this.valoracionFormativaTable();
		this.setTitleArea();
		this.valoracionAreaTable();
		this.setObservaciones();
		
		console.log(this.doc.internal.pageSize.getWidth());
		console.log(this.doc.internal.pageSize.getHeight());
		// this.doc.setFont('Calibri Bold', 'bold');
		// this.doc.setFontSize(28);
		// const text = 'Hola como estas?';
		// this.doc.text(text, 55, 20);
		// console.log('Cadena', this.doc.getStringUnitWidth(text));
		// this.doc['centerText']('Institución Educativa Integrada de Chilví', { align: 'center' }, 0, 45);
		this.pathIframe = this.doc.output('datauristring');
	}

	customMethodsJSPDF(): void {
		jsPDF.API['centerText'] = centerText;
	}

	addFonts(): void {
		this.doc.addFont("assets/fonts/Arial-Bold.ttf", "Arial Bold", "bold");
		this.doc.addFont('assets/fonts/Arial.ttf', 'Arial', 'normal');
		this.doc.addFont("assets/fonts/Calibri-Bold.ttf", "Calibri Bold", "bold");
	}

	headerInstitucional(): void {
		const infoInstitucional = {
			nombre: 'Institución Educativa Integrada de Chilví',
			niveles: 'PREESCOLAR, BASICA PRIMARIA-SECUNDARIA-MEDIA VOCACIONAL-BACHILLERATO POR CICLOS',
			direccion: 'SEDES: CHILVI-KM 28-EL CEIBITO-MASCAREY- LA CEIBA-PUERTO NIDIA',
			resolucion: 'Resolución no 4075 del 27 de diciembre de 2002 de Secretaria de Educación Municipal y decreto 3011 de educación por Ciclos',
			nit: 'NIT. 840000286-7  – CODIGO DANE 252835005436',
			ubicacion: 'Tumaco-Nariño'
		};
		const { nombre, niveles, direccion, resolucion, nit, ubicacion } = infoInstitucional;
		this.doc.setFont('Calibri Bold', 'bold');
		this.doc.setTextColor('#B4B4B4');
		this.doc.setFontSize(28);
		this.doc['centerText'](nombre, { align: 'center' }, 0, 15);
		this.doc.setFontSize(10);
		this.doc['centerText'](niveles, { align: 'center' }, 0, 23);
		this.doc['centerText'](direccion, { align: 'center' }, 0, 27);
		this.doc.setFontSize(9);
		this.doc['centerText'](resolucion, { align: 'center' }, 0, 31);
		this.doc.setFont('Arial Bold', 'bold');
		this.doc['centerText'](nit, { align: 'center' }, 0, 35);
		this.doc['centerText'](ubicacion, { align: 'center' }, 0, 39);
	}

	headerBoletin(): void {
		const infoBoletin = {
			titulo: 'BOLETIN FINAL',
			ciclo_anio: 'CICLO 22 – AÑO LECTIVO 2021',
			sede: 'SEDE CHILVI'
		};
		const { titulo, ciclo_anio, sede } = infoBoletin;
		this.doc.setFont('Arial Bold', 'bold');
		this.doc.setFontSize(12);
		this.doc.setTextColor('#000');
		this.doc['centerText'](titulo, { align: 'center' }, 0, 55);
		this.doc['centerText'](ciclo_anio, { align: 'center' }, 0, 61);
		this.doc['centerText'](sede, { align: 'center' }, 0, 67);
	}

	setNameEstudiante(): void {
		const nombre = 'MAIRA ALEJANDRA FLORES QUIÑONES';
		this.doc.setFont('Arial Bold', 'bold');
		this.doc.setFontSize(11);
		this.doc.text(`ALUMNO(A): ${ nombre }`, 14.1, 80);
	}

	valoracionFormativaTable(): void {
		const dataBody = [
			['01', 'Actitud del estudiante para el trabajo académico no presencial.', 'X', '', ''],
			['02', 'Actitud frente a la filosofía institucional.', '', 'X', ''],
			['03', 'Capacidad para aprender y asumir lo aprendido.', '', '', 'X'],
			['04', 'Puntualidad en la entrega de actividades.', 'X', '', ''],
			['05', 'Respeto y buena convivencia.', '', 'X', ''],
			['06', 'Responde acertadamente a las actividades enviadas.', '', '', 'X'],
			['07', 'Responsabilidad con los trabajos asignados.', '', 'X', ''],
		];
		autoTable(this.doc, {
			startY: this.beginValoracionCualitativaTable, // 88
			head: [
				[
					{ content: 'Nº', rowSpan: 2, styles: { cellWidth: 12 } },
					{ content: 'VALORACIÓN FORMATIVA', rowSpan: 2 },
					{ content: 'VALORACIÓN CUALITATIVA', colSpan: 3, title: 'vc' }
				],
				[
					{ content: 'NUNCA', title: 'nunca' },
					{ content: 'A VECES', title: 'aVeces' },
					{ content: 'SIEMPRE', title: 'siempre' }
				],
			],
			body: dataBody,
			theme: 'plain',
			columnStyles: {
				0: { halign: 'center', valign: 'middle', cellPadding: 1 },
				1: { cellPadding: { top: 1, bottom: 1, left: 3, right: 3 } },
				2: { halign: 'center', valign: 'middle', cellPadding: 1, fontStyle: 'bold' },
				3: { halign: 'center', valign: 'middle', cellPadding: 1, fontStyle: 'bold' },
				4: { halign: 'center', valign: 'middle', cellPadding: 1, fontStyle: 'bold' },
			},
			didParseCell: data => {
				if (data.section === 'head') {
					data.cell.styles.lineColor = [0, 0, 0];
					data.cell.styles.lineWidth = 0.1;
					data.cell.styles.halign = 'center';
					data.cell.styles.valign = 'middle';
					data.cell.styles.cellPadding = 1;
					data.cell.styles.font = 'Arial Bold';
					data.cell.styles.fontSize = 10;
					if (data.cell.raw['title'] === 'vc' )
						data.cell.styles.fillColor = '#4F81BD';

					if (data.cell.raw['title'] === 'nunca' || data.cell.raw['title'] === 'aVeces' || data.cell.raw['title'] === 'siempre') {
						data.cell.styles.font = 'Arial';
						data.cell.styles.cellWidth = 20;
					}
				}

				if (data.section === 'body') {
					data.cell.styles.lineColor = [0, 0, 0];
					data.cell.styles.lineWidth = 0.1;
				}
			},
			didDrawPage: data => {
				const headHeight = data.table.head[0].cells[0].height;
				const bodyHeight = data.table.body[0].height * dataBody.length;
				this.beginTextArea = this.beginValoracionCualitativaTable + headHeight + bodyHeight + this.marginTopTextArea;
				this.beginValoracionCuantitativaTable = this.beginTextArea + this.marginBottomTextArea;
			}
		});
	}

	setTitleArea(): void {
		const text = 'VALORACIÓN POR ÁREA';
		this.doc.setFont('Arial Bold', 'bold');
		this.doc.setFontSize(12);
		this.doc['centerText'](text, { align: 'center' }, 0, this.beginTextArea); // 158
	}

	valoracionAreaTable(): void {
		const dataBody = [
			['01', 'Ciencias naturales', '5.0', '', '', '', '', '1'],
			['02', 'Español y literatura', '5.0', '', '', '', '', '1'],
			['03', 'Física', '5.0', '', '', '', '', '1'],
			['04', 'Geografía de América', '5.0', '', '', '', '', '1'],
			['05', 'Geografía de Colombia', '5.0', '', '', '', '', '1'],
			['06', 'Geografía universal', '5.0', '', '', '', '', '1'],
			['07', 'Historia de América', '5.0', '', '', '', '', '1'],
			['08', 'Historia de Colombia', '5.0', '', '', '', '', '1'],
			['09', 'Ingles', '5.0', '', '', '', '', '1'],
			['10', 'Matemáticas', '5.0', '', '', '', '', '1'],
		];
		autoTable(this.doc, {
			startY: this.beginValoracionCuantitativaTable, // 165
			head: [
				[
					{ content: 'Nº', rowSpan: 3, styles: { cellWidth: 12 } },
					{ content: 'ÁREAS', rowSpan: 3 },
					{ content: 'VALORACIÓN CUANTITATIVA', colSpan: 6, title: 'vc' }
				],
				[
					{ content: 'VALORACIÓN FINAL', colSpan: 4, title: 'vf' },
					{ content: 'FALTAS', colSpan: 2, title: 'faltas' }
				],
				[
					{ content: 'D.S', title: 'D.S' },
					{ content: 'D.A', title: 'D.A' },
					{ content: 'D.B', title: 'D.B' },
					{ content: 'D.b', title: 'D.b' },
					{ content: 'JUST', title: 'JUST' },
					{ content: 'S.J', title: 'S.J' },
				]
			],
			body: dataBody,
			theme: 'plain',
			columnStyles: {
				0: { halign: 'center', valign: 'middle', cellPadding: 1 },
				1: { cellPadding: { top: 1, bottom: 1, left: 3, right: 3 } },
				2: { halign: 'center', valign: 'middle', cellPadding: 1, fontStyle: 'bold' },
				3: { halign: 'center', valign: 'middle', cellPadding: 1, fontStyle: 'bold' },
				4: { halign: 'center', valign: 'middle', cellPadding: 1, fontStyle: 'bold' },
				5: { halign: 'center', valign: 'middle', cellPadding: 1, fontStyle: 'bold' },
				6: { halign: 'center', valign: 'middle', cellPadding: 1, fontStyle: 'bold' },
				7: { halign: 'center', valign: 'middle', cellPadding: 1, fontStyle: 'bold' },
			},
			didParseCell: data => {
				if (data.section === 'head') {
					data.cell.styles.lineColor = [0, 0, 0];
					data.cell.styles.lineWidth = 0.1;
					data.cell.styles.halign = 'center';
					data.cell.styles.valign = 'middle';
					data.cell.styles.cellPadding = 1;
					data.cell.styles.font = 'Arial Bold';
					data.cell.styles.fontSize = 12;
					if (data.cell.raw['title'] === 'vc' ) {
						data.cell.styles.fillColor = '#4F81BD';
						data.cell.styles.font = 'Arial Bold';
						data.cell.styles.fontSize = 10;
					}

					if (data.cell.raw['title'] === 'vf' || data.cell.raw['title'] === 'faltas') {
						data.cell.styles.font = 'Arial Bold';
						data.cell.styles.fontSize = 8;
					}

					if (data.cell.raw['title'] === 'D.S' || data.cell.raw['title'] === 'D.A' || data.cell.raw['title'] === 'D.B' ||
						data.cell.raw['title'] === 'D.b' || data.cell.raw['title'] === 'JUST' || data.cell.raw['title'] === 'S.J') {
						data.cell.styles.font = 'Arial';
						data.cell.styles.fontSize = 8;
						data.cell.styles.cellWidth = 14;
					}
				}

				if (data.section === 'body') {
					data.cell.styles.lineColor = [0, 0, 0];
					data.cell.styles.lineWidth = 0.1;
				}
			},
			didDrawPage: data => {
				const headHeight = data.table.head[0].cells[0].height;
				const bodyHeight = data.table.body[0].height * dataBody.length;
				this.beginObservaciones = this.beginValoracionCuantitativaTable + headHeight + bodyHeight + this.marginTopObservaciones;
				// console.log('Inicio obs: ', this.beginObservaciones);
			}
		});
	}

	setObservaciones(): void {
		const text = 'OBSERVACIONES: Algún texto de prueba Algún texto de prueba Algún texto de prueba Algún texto de prueba Algún texto de prueba Algún texto de prueba Algún texto de prueba Algún texto de prueba Algún texto de prueba Algún texto de prueba Algún texto de prueba Algún texto de prueba .';
		const splitText: string[] = this.doc.splitTextToSize(text, 227);
		// console.log(splitText.length);
		const alturaObserveciones = this.doc.getTextDimensions(splitText[0]).h * splitText.length;
		// console.log(alturaObserveciones);
		this.doc.setFont('Arial Bold', 'bold');
		this.doc.setFontSize(10);
		this.doc.text(splitText, 14.1, this.beginObservaciones);

		this.doc.text('Otro texto', 14.1, this.beginObservaciones + alturaObserveciones + 2);

		// this.doc.html('Hola <br>Como estas?</br>', { x: 14.1, y: 250 });
	}

	previewPDF(): void {
		this.pathIframe = this.doc.output('datauristring');
	}

}