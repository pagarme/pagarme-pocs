using System;
using System.Windows.Forms;

namespace PagarMePOS
{
    public partial class Form1 : Form
    {
        PinPad pinpad;

        public Form1()
        {
            InitializeComponent();
        }

        private async void button1_Click(object sender, EventArgs e)
        {
            btnInicar.Enabled = false;
            btnFinalizar.Enabled = true;

            pinpad = new PinPad();
            await pinpad.Initialize();
        }

        private async void button1_Click_1(object sender, EventArgs e)
        {
            btnInicar.Enabled = true;
            btnFinalizar.Enabled = false;
            
            await pinpad.Terminate();
        }

        private void btnDisplay_Click(object sender, EventArgs e)
        {
            pinpad.MsgDisplay(txtDisplay.Text);
        }

        private async void Form1_FormClosed(object sender, FormClosedEventArgs e)
        {
            await pinpad.Terminate();
        }

        private async void button1_Click_2(object sender, EventArgs e)
        {
            await pinpad.Pay(Convert.ToInt32(txtAmount.Text));
        }

        private async void button2_Click(object sender, EventArgs e)
        {
            await pinpad.Card();
        }
    }
}
