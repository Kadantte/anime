@extends('dashboard.layouts.main')

@section('title')
    Titles
@endsection

@section('content')
    <div class="box">
        @include('dashboard.layouts.resource-header')
        <div class="box-body">
            <table id="titles" class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Language</th>
                        <th>Alternative Title</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody></tbody>
                <tfoot>
                    <tr>
                        <th>Title</th>
                        <th>Language</th>
                        <th>Alternative Title</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
@endsection

@section('scripts')
    <script>
        jQuery(function () {
            jQuery('#titles').dataTable({
                "aoColumns": [
                    {"sWidth": "20%"},
                    {"sWidth": "20%"},
                    {"sWidth": "20%"},
                    {"sWidth": "20%"},
                    {"sWidth": "20%"},
                ],
                "aLengthMenu": [
                    [10, 25, 50, 100, 99999999],
                    [10, 25, 50, 100, "All"]
                ],
                "iDisplayLength": 100,
                "bSort": true,
                "bAutoWidth": false,
                "sPaginationType": "bootstrap",
                "oLanguage": {
                    "sLengthMenu": "_MENU_ records",
                    "oPaginate": {
                        "sPrevious": "Prev",
                        "sNext": "Next"
                    }
                },
                "sAjaxSource": "{{ url('dashboard/titles/list/' . request()->segment(3)) }}",
                "bServerSide": true
            });
        });
    </script>
@endsection